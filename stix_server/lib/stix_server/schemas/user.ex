defmodule StixServer.Schemas.User do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :nickname]}
  schema "users" do
    field :password_hash, :string
    field :nickname, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:nickname, :password_hash, :password])
    |> validate_required([:nickname, :password])
    |> unique_constraint(:nickname)
  end
end
