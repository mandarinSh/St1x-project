defmodule StixServer.Accounts do
  import Ecto.Changeset

  alias StixServer.Schemas.User
  alias StixServer.Chat
  alias StixServer.Repo

  def registration_changeset(model, params) do
    model
    |> User.changeset(params)
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
    registration_changeset(%User{}, params) |> Repo.insert
  end

  def verify_user(%{"password" => password} = params) do
    params
      |> Chat.get_user()
      |> Bcrypt.check_pass(password)
  end

  def verify_user(_), do: nil
end