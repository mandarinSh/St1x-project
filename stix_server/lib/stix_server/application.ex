defmodule StixServer.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      # Start the Ecto repository
      StixServer.Repo,
      # Start the endpoint when the application starts
      StixServerWeb.Endpoint
      # Starts a worker by calling: StixServer.Worker.start_link(arg)
      # {StixServer.Worker, arg},
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: StixServer.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    StixServerWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
