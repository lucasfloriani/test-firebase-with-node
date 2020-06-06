# Middleware

Custom express functions to be executed before the real controller function

## Examples

- **user.ts**: Is executed before the user controller, it validates the HTTP body data and pass a DTO to their respective controller
- **errors.ts**: Is executed after the controller because it accepts errors from the controllers
