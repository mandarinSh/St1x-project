# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :stix_server,
  ecto_repos: [StixServer.Repo]

# Configures the endpoint
config :stix_server, StixServerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "44AELxYpgaZGVN5GzLaqlOCL/i3q8IP/Kyei5IIAEf2KRy4nKwPUzYqeL/QH/UCk",
  render_errors: [view: StixServerWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: StixServer.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
