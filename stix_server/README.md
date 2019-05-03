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

`DOMAIN_NAME` will means your ip-adress or domain name.


Users structure seems like: `id`, `email`, `nickname`, `first_name`, `last_name`
  
  example of returned value:  
    {  
      `id` : "id",  
      `email` : "email@email.com",  
      `first_name` : "first_name",  
      `last_name` : "last_name"  
    }  

Message structure seems like: `id`, `sender_id`, `subject_id`, `message_body`, `inserted_at`

  example of returned value:  
    {  
      `id` : "id",  
      `sender_id` : "sender_id",  
      `subject_id` : "subject_id",  
      `message_body` : "message_body",  
      `inserted_at` : "YYYY-MM-DD HH:MM:SS"  
    }

### /api scope:
  * `GET` "/users":  
        returns array of users in JSON format.

  * `GET` "/users/ID":  
        returns JSON with user which id = ID if exists.

  * `POST` "/sign_up" with parameters of USER structure above. Required fields: `email` and `password`.  
        reutrns JSON with user which created, also puts response status ':created' if everything alright. Else puts ':bad_request' status.
    
  * `POST` "/sign_in" with parameters of USER structure above. Required only `email` and `password` fields.  
        puts response status 200 and JSON with user if logined

  * `POST` "/send_message" with parameters of MESSAGE structure above. Required only `sender_id`, `subject_id`, `message_body`.  
        puts response status 200 and JSON with message if sended.  
        Else puts `bad_request` status

  * `GET` "/get_latest_message_of_dialogs_of_user/ID", where `ID` is current user id.  
        returns `JSON` with array, which element is last message of each user who have dialog with user with `id`==ID, but with some features of the next structure:  
        {  
          `sender_id`: "sender_id",  
          `subject_id` : "subject_id",  
          `message_body` : "message_body",  
          `email` : "email@email.com",  
          `first_name` : "first_name",  
          `last_name` : "last_name",  
          `inserted_at` : "YYYY-MM-DD HH:MM:SS"  
        }

  * `GET` "/get_all_messages_of_dialog"  
        Require:  
            `sender_id`, `subject_id`  
        returns `JSON` with array of `MESSAGE` elements, sorted by date

  * `GET` "/get_user_by_email/EMAIL", where `EMAIL` is email of user which need to find  
        returns `JSON` with user, which `user.email` == `EMAIL`