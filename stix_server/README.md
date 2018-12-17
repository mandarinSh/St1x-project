# StixServer

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix


## API

'DOMAIN_NAME' will means your ip-adress or domain name.

Users have next felds: ':id', ':email', ':nickname', ':first_name', ':last_name'

### /api scope:
  * 'GET' "/users":
    returns all users.

  * 'GET' "/users/:id":
    returns user with id = :id if exists.

  * 'POST' "/sign_up" with parameters of user above. Required :email and :password.
    reutrns user which created, also puts response status ':created' if everything alright. Else puts ':bad_request' status.
    
  * 'POST' "/sign_in" with parameters of user above. Requeared only email and password.
    puts response status 200 and user if logined
