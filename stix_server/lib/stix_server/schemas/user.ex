defmodule StixServer.Schemas.User do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :email, :nickname]}
  schema "users" do
    field :birthday, :date
    field :email, :string
    field :first_name, :string
    field :info, :string
    field :is_active, :boolean, default: false
    field :last_name, :string
    field :nickname, :string
    field :password, :string
    field :phone_number, :string
    field :status, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:nickname, :email, :password, :first_name, :last_name, :birthday, :status, :info, :phone_number, :is_active])
    |> validate_required([:email, :password])
    |> unique_constraint(:email)
    |> unique_constraint(:phone_number)
  end
end
