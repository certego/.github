# Worflows

## [Reusable detect changes workflow](_detect_changes.yml)

This sub workflow detects and enumerates the changes between two branches.

The workflow is composed of five steps:

1. **Check out PR target branch** - This step checks out the latest commit of the PR target branch for the current repository. This workflow was designed to detect changes when a PR to a target branch was created. Therefore, the latest commit of the target branch must be checked out as the first step. To achieve this, GitHub's [**checkout**](https://github.com/actions/checkout) action is used with the following parameters:
   1. **ref** - The branch, tag or SHA to checkout - It is set to `github.base_ref`, which corresponds to the **PR target branch**.
2. **Check out source branch latest commit** - This step checks out the latest commit of the source branch on top of the previous one. To do so, GitHub's [**checkout**](https://github.com/actions/checkout) action is used with the following parameters:
   1. **clean** - Whether to execute `git clean -ffdx && git reset --hard HEAD` before fetching - It is set to false, which means **do not delete untracked files**.
3. **Generate summary** - This step creates the title for the action summary. As a matter of fact, the detected changes will be reported below the title in the summary section. The step is performed only if one or both *backend_directories* and *frontend_directories* inputs are not empty.
4. **Generate diffs for backend** - This step detects and enumerates the files that changed between the two branches. This is performed using [`git diff`](https://git-scm.com/docs/git-diff) command. Specifically, the code instructs git to show the changes in the *backend_directories* relative to `origin/<github.base_ref>` (the target branch). During this process, the [**pathspec**](https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-aiddefpathspecapathspec) is used to exclude files or directories specified in the *backend_exclusions* input. The changes are then enumerated and output through the *backend* variable.
5. **Generate diffs for frontend** - This step follow the same pattern as the **Generate diffs for backend** step but for the frontend directories.

### Documentation

#### Inputs

* **backend_directories** - Optional - Space separated list of backend directories to check for changes. By default, it is set to an empty string.
* **backend_exclusions** - Optional - Space separated list of backend files or directories to **exclude** when checking for changes. Globs are supported. By default, it is set to an empty string.
* **frontend_directories** - Optional - Space separated list of frontend directories to check for changes. By default, it is set to an empty string
* **frontend_exclusions** - Optional - Space separated list of frontend files or directories to **exclude** when checking for changes. Globs are supported. By default, it is set to an empty string.
* **ubuntu_version** - Optional - The Ubuntu version to run the workflow against. By default, it is set to `latest`.

#### Outputs

* **backend** - The number of backend files that have changed.
* **frontend** - The number of frontend files that have changed.

## [Reusable node tests workflow](_node.yml)

This sub workflow install node dependencies and run frontend linters and tests.

The workflow is composed of nine steps:

1. **Check out latest commit for current branch** - This step checks out the latest commit for the current branch of the repository. To do so, it uses GitHub's [**checkout**](https://github.com/actions/checkout) action with no parameters.
2. **Set up Node.js** - This step sets Node.js up downloading binaries and project's dependencies. This is done using the GitHub's [**setup-node**](https://github.com/actions/setup-node) action which also allows to cache and restore the project dependencies. It's used with the following parameters:
   1. **node-version** - Node.js version to use - It is set according to *node_version* input variable.
   2. **cache** - Which package manager used to install and cache packages - It is set to `npm`.
   3. **cache-dependency-path** - Path to the dependency file: `package-lock.json`, `yarn.lock` etc. It is set to `<working_directory>/package-lock.json`, where *working_directory* is the input variable.
3. **Add dependencies** - This step adds additional dependencies to the `package-lock.json` file. Specifically, these packages are added to the **devDependencies** part of the aforementioned file. Which packages will be added is chosen accordingly to input variables:
   1. *use_jest*
   2. *use_react*
   3. *use_eslint*
   4. *use_prettier*
   5. *use_stylelint*
4. **Install packages** - This step install all missing packages from the dependency file in the directory specified by the *working_directory* input variable.
5. **Run linters** - This step uses [**node_linter**](../actions/node_linter/action.yml) action to run linters against the frontend source code.
6. **Check packages licenses** - This step uses [**pilosus/action-pip-license-checker**](https://github.com/pilosus/action-pip-license-checker) to check the licenses used by the project requirements. 
7. **Run CodeQL** - This step uses [**codeql**](../actions/codeql/action.yml) action to run CodeQL to discover vulnerabilities across the codebase.
8. **Run custom command** - This step is performed only if the input variable *custom_command* is not empty. The step simply run the bash command described in the previously mentioned input variable in the working directory specified by the *working_directory* input variable.
9. **Run jest tests** - This step runs Jest tests if the input variable *use_jest* is set to true. Finally, if *use_coverage* and *upload_coverage* are set to true, a coverage report is generated and uploaded.

### Documentation

#### Inputs

* **node_versions** - Required - An array of Node.js versions to use.
* **working_directory** - Required - Path to the `package.json` file
* **check_packages_licenses** - Optional - Whether to check npm packages licenses or not. By default it is set to true.
* **use_jest** - Optional - Whether to use Jest test suite or not. By default it is set to false.
* **use_react** - Optional - Whether react is used by the project or not. By default it is set to false.
* **use_eslint** - Optional - Whether to use ESlint linter or not. By default it is set to true
* **use_prettier** - Optional - Whether to use Prettier formatter or not. By default it is set to true.
* **use_stylelint** - Optional - Whether to use Stylelint linter or not. By default it is set to true.
* **use_coverage** - Optional - Whether to use Coverage or not. To work, it also require *use_jest* to be true. By default it is set to false.
* **upload_coverage** - Optional - Whether to upload coverage report to GitHub. By default it is set to false
* **run_codeql** - Optional - Whether to run CodeQL against the codebase. By default it is set to false.
* **custom_command** - Optional - A custom bash command to be run by the workflow. By default it is set to an empty string.
* **max_timeout** - Optional - A maximum amount of minutes allowed for the workflow to run. By default it is set to 30.
* **ubuntu_version** - Optional - The Ubuntu version to run the workflow against. By default it is set to `latest`.

## [Reusable python linter workflow](_python.yml)

This sub workflow runs Python linters and tests against the codebase.

It is composed of one job:

1. **python** - This job is composed of thirty-one steps:
   1. **Check out latest commit** - Checks out the latest commit on the current branch of the repository.
   2. **Set up Python**
   3. **Inject stuff to environment**
   4. **Restore APT cache related to PR event**
   5. **Restore APT cache related to target branch**
   6. **Restore APT repositories**
   7. **Install APT requirements**
   8. **Save APT cache related to PR event**
   9. **Check requirements licenses**
   10. **Print wrong licenses**
   11. **Create linter requirements file**
   12. **Create dev requirements file**
   13. **Create docs requirement file**
   14. **Restore Python virtual environment related to PR event**
   15. **Restore Python virtual environment related to target branch**
   16. **Create Python virtual environment**
   17. **Restore pip cache related to PR event**
   18. **Restore pip cache related to target branch**
   19. **Install project requirements**
   20. **Install other requirements**
   21. **Save Python virtual environment related to PR event**
   22. **Save pip cache related to PR event**
   23. **Run linters**
   24. **Run CodeQL**
   25. **Build Docs**
   26. **Start services**
   27. **Start celery worker**
   28. **Run custom command**
   29. **Check migrations**
   30. **Run unittest**
   31. **Create coverage**

## [Create APT cache](create_apt_cache.yaml)

This workflow is run in the event of **a push on branches *main*, *master*, *develop*, *dev***. Specifically, it is triggered only when the APT requirements file is updated.

The workflow is composed of a single job:

1. **Create cache for APT dependencies** - This job, as described by its name, creates a cache for APT dependencies and stores it on GitHub. It is composed of four steps:
   1. **Check out latest commit on current branch** - This step checks out the latest commit on the current branch of the repository.
   2. **Install APT dependencies** - This step refreshes APT repositories and then install the project dependecies. This action is required to produce the APT cache that will be saved later.
   3. **Compute APT dependencies file SHA256 hash** - This step computes the SHA256 of the APT dependency file that will be used as cache key.
   4. **Save APT cache** - This step saves APT cache on GitHub. The GitHub's [**cache/save**](https://github.com/actions/cache/tree/main/save) action is used.

## [Create Python cache](create_python_cache.yaml)

This workflow is run in the event of **a push on branches *main*, *master*, *develop*, *dev***. Specifically, it is triggered only when the Python requirements file is updated.

The workflow is composed of a single job:

1. **Create cache for Python dependencies** - This job, as described by its name, creates a cache for Python dependencies and stores it on GitHub. It is composed of four steps:
   1. **Check out latest commit** - This step checks out the latest commit on the current branch for the repository.
   2. **Set up Python** - This step install Python on the runner.
   3. **Set up Python virtual environment** - This step uses [**create_virtualenv**](../actions/python_requirements/create_virtualenv/README.md) action to create a Python virtual environment.
   4. **Install Python dependencies** - This step install Python requirements to produce the final virtual environment that will be cached. Also, installing the Python dependencies, creates the pip cache.
   5. **Save pip cache** - This step uses [**save_pip_cache**](../actions/python_requirements/save_pip_cache/README.md) action to save pip's download cache on GitHub.
   6. **Create virtual environment cache** - This step uses [**save_virtualenv**](../actions/python_requirements/save_virtualenv/README.md) action to save virtual environment on GitHub's cache.

## [CI](pull_request_automation.yml)

This workflow runs in the case of a **pull request on branches *master*, *main*, *develop*, *dev*** and it's the core CI workflow.

It is composed of three jobs:

1. **detect-changes** - This job detects and enumerates changes to backend and/or frontend files. To do so, it uses the [**_detect_changes**](_detect_changes.yml) workflow.
2. **node** - If any changes to the frontend files are found, [**_node**](_node.yml) workflow is run.
3. **python** - If any changes to the backend files are found, [**_python**](_python.yml) workflow is run.

## [Release and publish](release.yml)

TODO

## [Reusable release and tag workflow](_release_and_tag.yml)

TODO