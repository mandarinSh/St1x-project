defmodule StixServer.Schemas.User do
  use Ecto.Schema
  import Ecto.Changeset

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

  def get_user_by_nickname(nickname) do
    import Ecto.Query, only: [from: 2]

    alias StixServer.Schemas.User

    (from u in User,
      where: (u.nickname == ^nickname),
      select: u)
      |> StixServer.Repo.all()
  end
end
