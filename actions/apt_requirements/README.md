# Composite action install APT requirements

This action install possible APT requirements defined in a standalone file.
To speed up this process, and hence to avoid re-downloading the requirements each time even though nothing has changed GitHub cache has been exploited.

First, a SHA256 hash of the APT requirements file is produced.
The aforementioned hash is then used to (respectively) query the caching system on GitHub for:

* The git reference of the Pull Request (e.g. `941/merge`).
* The target branch reference (e.g. `develop`).

If requirements `.deb` files were previously cached, so in case of a **cache hit**, they will be restored to the correct APT cache directory (i.e. `/var/cache/apt/archives`). Doing this allow us to skip:

* Refreshing the repositories package lists (i.e. `apt update` command)
* Downloading the required packages and their dependencies.

After querying the GitHub cache, `apt install` command is run with the space separated list of APT requirements to install all dependencies.

Finally, if both cache queries resulted in a miss, APT requirements are cached using `<name of the current git reference>-<SHA256 hash of the APT requirements file>`.

NOTE:

As you can see, here two restore

TODO finire documentazione

## Documentation

### Inputs

* `requirements_file` - Mandatory - Path to the APT requirements file. This file must contain a list of packages to install, one per line.
