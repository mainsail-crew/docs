# Getting Help

If you're experiencing issues with Crowsnest, we're here to help!

!!! info "Self-Diagnosis"
    The Crowsnest log file is designed to be human-readable. We highly recommend reviewing it yourself first, as it often contains clear error messages pointing to the solution.

!!! warning "LLMs/Chatbots"
    We advise against using LLMs/Chatbots for troubleshooting, as they may suggest non-existent options. If you insist on using one, you should still follow [Reporting Issues effectively](##reporting-issues-effectively) to get the best results and make sure to send them always a new log after you made a change.

## Support Channels

For assistance, please join our [Discord Server](https://discord.gg/mainsail) and create a post in the **#support-forum**.

!!! tip
    Responses may take some time depending on volunteer availability. Please be patient and respectful.

## Reporting Issues effectively

To help us resolve your issue quickly, please provide the following information when creating a support post:

- **Descriptive Title:** Briefly summarize the problem (e.g., "Webcam not detected after update").
- **Screenshots:** Include images of errors or unexpected behavior if applicable.
- **Logs:** Upload a clean log file capturing the issue.

### How to Generate a Clean Log

1.  Update your `crowsnest.conf` by modifying the following settings in the `[crowsnest]` section to enable debug logging and clear old logs on restart:

    ```ini
    [crowsnest]
    log_level: debug
    delete_log: true
    ```

2.  Restart the Crowsnest service.
3.  Reproduce the issue.
4.  Locate the log file.
