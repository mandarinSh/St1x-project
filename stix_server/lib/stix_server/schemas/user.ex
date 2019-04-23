defmodule StixServer.Schemas.User do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  alias StixServer.Schemas.User
  alias StixServer.Repo

  @derive {Jason.Encoder, only: [:id, :nickname]}
  schema "users" do
    field :hashed_password, :string
    field :nickname, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:nickname, :hashed_password])
    |> validate_required([:nickname, :hashed_password])
    |> unique_constraint(:nickname)
  end

  def create_user(params) do
    User.changeset(%User{}, params) |> Repo.insert
  end

  def get_user(%{"nickname" => nickname}) do
    (from u in User,
      where: (u.nickname == ^nickname),
      select: u)
      |> Repo.all()
  end

  def get_user(%{"id" => id}) do
    Repo.get(User, id)
  end
end
