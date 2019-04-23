defmodule StixServer.Schemas.User do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  alias StixServer.Schemas.User
  alias StixServer.Repo

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

  def registration_changeset(model, params) do
    model
    |> changeset(params)
    |> cast(params, [:password])
    |> validate_length(:password, min: 6)
    |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash,   
                   Bcrypt.hash_pwd_salt(pass))
  
      _ ->
        changeset  
    end
  end

  def create_user(params) do
    User.registration_changeset(%User{}, params) |> Repo.insert
  end

  def get_user(%{"nickname" => nickname}) do
    (from u in User,
      where: (u.nickname == ^nickname),
      select: u)
      |> Repo.one()
  end

  def get_user(%{"id" => id}) do
    Repo.get(User, id)
  end

  def get_user(_), do: nil

  def verify_user(%{"password" => password} = params) do
    params
      |> User.get_user()
      |> Bcrypt.check_pass(password)
  end

  def verify_user(_), do: nil
end
