"""
Hook to set a different repo URL/name per documentation section.
Configure SECTION_REPOS below: key = path prefix, value = (repo_url, repo_name).
The first matching prefix wins (checked in order).
"""

SECTION_REPOS = {
    "mainsailos/": (
        "https://github.com/mainsail-crew/MainsailOS",
        "mainsail-crew/MainsailOS",
    ),
    "crowsnest/": (
        "https://github.com/mainsail-crew/crowsnest",
        "mainsail-crew/crowsnest",
    ),
    "sonar/": (
        "https://github.com/mainsail-crew/sonar",
        "mainsail-crew/sonar",
    ),
}


def on_page_context(context, page, config, nav):
    """Override repo_url and repo_name based on the page's source path."""
    src = page.file.src_path  # e.g. "mainsailos/index.md"

    for prefix, (repo_url, repo_name) in SECTION_REPOS.items():
        if src.startswith(prefix):
            context["config"]["repo_url"] = repo_url
            context["config"]["repo_name"] = repo_name
            break

    return context
