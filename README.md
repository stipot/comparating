# Comprating is an application to compare International University rankings

# Description

Decree of the Government of the Russian Federation from April 25, 2012 No. 389 for the first time criteria have been introduced formation of a list of foreign educational and scientific organizations in the list of foreign educational and scientific organizations, received education and (or) qualifications, academic degrees and academic titles in which are recognized in the Russian Federation.

This list was revised by the Government of the Russian Federation, taking into account the current data of the Academic rating Academic Ranking of World Universities, QS World University Rankings) and the Times Higher Education World University Ranking). At the same time, universities are selected that occupy the first three hundred positions simultaneously in all three ratings. The list was formed on a cumulative basis. If the university is in some year did not make it into the selection, he nevertheless remained on the list.

Starting in 2021 Government Decree Russian Federation dated March 5, 2021 N 326 new criteria for the formation of the list of foreign educational and scientific organizations in the list of foreign educational and scientific organizations, received education and (or) qualifications, academic degrees and academic titles in which are recognized in the Russian Federation

The new criteria establish that a foreign educational organization and a foreign scientific the organization is included in the current year in one of the first 500 positions in at least 3 out of 5 international ratings at the same time: Academic Ranking of World Universities, world QS World University Rankings, The Times Higher Education World University Rankings), the world ranking of universities (U.S. News Best Global Universities) and Moscow International University Ranking "Three University Missions".

The wording of the new criteria ("included in the current year") does not exclude the possibility of losing legal status foreign level education and (or) qualifications, academic degree and academic title of university graduates who have dropped out of the list. V In this case, the educational organization can expel and the employer can dismiss the employee if there is qualification requirements for the position.

Taking this feature into account, the Comparanking program was developed, which allows you to analyze ratings and conformity organization according to established criteria.

When developing the program, it was taken into account that ratings do not provide data in a machine-readable format. Their comparison does not exclude uncertainty due to the fact that the names of the university in different rankings can differ.

Comparanking allows you to evaluate a university by its rank in 5 world rankings, entering at the same time in the aggregate of rankings. Select rated universities for each country. Go to the official website of the university.

Then you can go directly to the section Analysis comparison of ratings in the context of new criteria.

# Demo

Demo version of the application is accessible on https://comparating.stipot.com



# Development

## Installation

1. clone https://github.com/stipot/comparating.git
2. npm install
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
4. Deployment
```
npm install -g firebase-tools
powershell Set-ExecutionPolicy unrestricted
firebase login
```

# Troubleshooting
## Cache issue
After Firebase deployment could be cache issues. Please, clear the browser cache. 
Ctrl+shift+J. Network tab. Check Disable cache. Refresh page. Uncheck Disable cache option. Ctrl+shift+J - to hide Dev Tools.

## Project data structure

/assets/config/data
  ./compare/
    ./analyse.json - data prepared by the programme to show final data on Analyse page.
    ./exclude.json - list of countries excluded from the analyses due to international agreements https://nic.gov.ru/ru/docs/foreign/confirmation
    ./dbindex.json - list of ratings data files from ../ratings/ folder.
    ./disamb.json - data for organization's name disambiguation. If the programme on the page Sources found organization's name which doesn't mentioned in the file so the programme propose to get disambiguation data using Google search API. Append the disamb.json data after you get it on the Unification page.
  ./ratings/ - folder with rankings data files.
  

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


### Data preparation
* When obtaining data from Google on disambiguation in the /compare/disamb.json file, remove the mention of topuniversities, wikipedia, linkedin

### Committing code
To ensure code quality, we follow and enforce the [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)
These guidelines define a Commit Message Format and certain rules that will help teams achieve consistency with version control and source code management practices.

#### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples: (even more [samples](https://github.com/angular/angular/commits/master))

```
docs(changelog): update changelog to beta.5
```
```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

#### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

#### Type
Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

#### Scope
The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages.

There are currently a few exceptions:

* **packaging**: used for changes that change the npm package layout in all of our packages, e.g.
  public path changes, package.json changes done to all packages, d.ts file/format changes, changes
  to bundles, etc.
* **changelog**: used for updating the release notes in CHANGELOG.md
* none/empty string: useful for `style`, `test` and `refactor` changes that are done across all
  packages (e.g. `style: add missing semicolons`) and for docs changes that are not related to a
  specific package (e.g. `docs: fix typo in tutorial`).

#### Subject
The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

#### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.
