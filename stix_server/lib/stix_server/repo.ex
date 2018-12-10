defmodule StixServer.Repo do
  use Ecto.Repo,
    otp_app: :stix_server,
    adapter: Ecto.Adapters.Postgres
end
