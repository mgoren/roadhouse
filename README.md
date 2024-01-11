# Registration site

Simple registration / admissions sales site for contra dance events.
React app that uses Firebase for database / serverless functions back-end / hosting.

# Configuration

prerequisites:
- node
- firebase account
- github account

---

## Install CLI tools:

- Install [GitHub CLI](https://cli.github.com/)
- Install [Firebase CLI](https://firebase.google.com/docs/cli)
- Install [Google Cloud CLI](https://cloud.google.com/sdk/docs/install-sdk)
- Install Google Cloud CLI beta components: `gcloud components install beta`

## Fork template project and git clone it.

## Erase settings from old project:

```sh
rm .env
rm .firebaserc
rm -rf .firebase
rm -rf node_modules
rm -rf functions/node_modules
cp .env.example .env
git remote rm origin
```

## Set configuration options:

- Update site title in `public/index.html`
- Update values in `src/config.js`

## Login to the Firebase CLI:

```sh
firebase login
```

## Create a Firebase project, which will also create a Google Cloud project with the same PROJECT_ID:

```sh
firebase projects:create [PROJECT_ID] --display-name "[PROJECT_NAME]"
firebase init database --project [PROJECT_ID]
firebase deploy --only database # accept defaults, don't overwrite dataabase rules
```

## Enable billing on Google Cloud account from the [Google Cloud console](https://console.cloud.google.com/billing)
(Very unlikely to actually owe any money for small scale use, but set a billing alert to be safe.)

7. Setup [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent)

- user type: internal
- values for other fields don't really matter
- not necessary to add any scopes

## Link new project to Google Cloud billing account:

```sh
gcloud billing accounts list
gcloud billing projects link [PROJECT_ID] --billing-account [BILLING_ACCOUNT_ID]
```

## Enable Google Cloud APIs & create API key:

Update allowed-referrers list in `google-places-api-flags.yaml` file.

```sh
gcloud services enable sheets.googleapis.com --project [PROJECT_ID]
gcloud services enable places-backend.googleapis.com --project [PROJECT_ID]
gcloud services enable maps-backend.googleapis.com --project [PROJECT_ID]
gcloud beta services api-keys create --flags-file=google-places-api-flags.yaml --project [PROJECT_ID]
```

Copy `keyString` value to `REACT_APP_GOOGLE_PLACES_API_KEY` in `.env`.

## Create web app from Firebase console on project overview screen

## Get firebase web app config values and add them to `.env` file:

```sh
firebase apps:sdkconfig web
```

## If not already copied from previous step, add Firebase database URL to `.env` file:

- Get database name: `firebase database:instances:list`
- Add database URL to `.env` file in this format: `https://[DATABASE_NAME].firebaseio.com`

## Setup reCAPTCHA

- [Register site with recaptcha](https://www.google.com/recaptcha/admin/create)
- label: [doesn't really matter]
- reCAPTCHA type: v2 not a robot challege
- Domains: localhost, [PROJECT_ID].web.app, EXAMPLE.COM (obviously replace with actual domain)
- Google Cloud Platform: associate with this google cloud project
- Copy site key value to `REACT_APP_RECAPTCHA_SITE_KEY` in `.env`.

## Setup Stripe or PayPal:

Stripe configuration:
- On Stripe console, disable all payment methods except Cards, Apple Pay, Google Pay
- Copy the publishable key to the `.env` file. (Use test key until ready to launch.)

PayPal configuration:
- Don't want to accept Venmo? Comment out the venmo line in `config.js`.
- Copy the client ID to the `.env` file. Ignore the secret key. (Use sandbox mode key until ready to launch.)

## Copy `.env` file values over to GitHub Secrets for workflow use:

```sh
bash update-github-secrets.sh
```

## Add Firebase Service Account as GitHub Secret:

Note: answer no to the yes/no questions; this stuff is already configured.

```sh
firebase init hosting:github
rm .github/workflows/firebase-hosting-pull-request.yml
```

Update `firebaseServiceAccount` value in ``.github/workflows/firebase-hosting-merge.yml`` to name of GitHub secret set by previous step.

## Setup, test and deploy Firebase Functions

```sh
cd functions && npm install && cd ..
```

**Database Update Firebase function:**

```sh
gcloud iam service-accounts create firebase --project portland-roadhouse
gcloud iam service-accounts keys create tmp.json --iam-account firebase@portland-roadhouse.iam.gserviceaccount.com
firebase functions:config:set database.service_account="$(cat tmp.json)"
rm tmp.json
firebase functions:config:get > functions/.runtimeconfig.json // for testing
```


**Stripe Firebase function:**

_Note: Comment out the lines pertaining to Stripe in `functions/index.js` if not using Stripe_

```sh
firebase functions:config:set stripe.secret_key="YOUR_STRIPE_SECRET_KEY"
firebase functions:config:set stripe.site_url="https://portland-roadhouse.web.app" // replace with actual front-end site URL
firebase functions:config:get > functions/.runtimeconfig.json // for testing
firebase emulators:start --only functions // for testing
firebase deploy --only functions // to deploy
```

**Google Sheets Firebase function:**

Create Google Cloud service account on project, save keys to firebase function config:

```sh
gcloud iam service-accounts create sheets --project portland-roadhouse
gcloud iam service-accounts keys create tmp.json --iam-account sheets@portland-roadhouse.iam.gserviceaccount.com
firebase functions:config:set googleapi.service_account="$(cat tmp.json)"
rm tmp.json
```

Setup spreadsheet for recording orders:

_Note: Update fields/columns as needed in `functions/fields.js` and in spreadsheet._

- Make a copy of the [template spreadsheet](https://docs.google.com/spreadsheets/d/1gQ9l8wBTgNmiI0KmpECsDzCqePSPMnZFaecuj0VO_cU/edit?usp=sharing).
- Give spreadsheet edit permissions to the service account email: `sheets@portland-roadhouse.iam.gserviceaccount.com`
- Determine your spreadsheet ID - the long string of characters (likely between `/d/` and `/edit`)

```sh
firebase functions:config:set googleapi.sheet_id="YOUR_SPREADSHEET_ID"
firebase functions:config:get > functions/.runtimeconfig.json // for testing
firebase deploy --only functions // to deploy
```

**Email Confirmation Firebase function:**

Configure with Sendgrid API key and from/reply/subject settings:

```sh
firebase functions:config:set sendgrid.api_key="SENDGRID_API_KEY"
firebase functions:config:set email.from='"Example" <example@example.com>' email.subject='Example Contra Dance Registration'
firebase functions:config:set email.reply_to='example@example.com' // only if needed
firebase functions:config:get > functions/.runtimeconfig.json // for testing
firebase deploy --only functions // to deploy
```

**Add error logging for Firebase functions**

Setup logs for Firebase Function (at least the spreadsheet one) to notify on `severity=(ERROR OR INFO)`.

_ADD MORE INFO TO THIS README SECTION._

# Development

Set environment variables in `.env`

```sh
npm install
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Deployment via GitHub workflow and Firebase hosting

- Set environment variables as [secrets](https://github.com/mgoren/corvallis/settings/secrets/actions) on the repo and update `.github/workflows/firebase-hosting-merge.yml`.
- Deploy again after updating github secrets!
