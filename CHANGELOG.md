# 1.6.x
## 1.6.0
### Features

* Added *create_apt_cache.yaml* workflow to cache APT requirements each time a commit is pushed on selected branch and **when the requirements file has changed**.

### Changes

* Removed `awalsh128/cache-apt-pkgs-action@latest` action and rewrote APT caching using GitHub's `actions/cache/restore@v4` and `actions/cache/save@v4`.
