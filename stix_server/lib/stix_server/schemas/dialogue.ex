defmodule StixServer.Schemas.Dialogue do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :participators]}
  schema "dialogues" do
    field :participators, {:array, :integer}

    timestamps()
  end

  @doc false
  def changeset(dialogue, attrs) do
    dialogue
    |> cast(attrs, [:participators])
    |> validate_required([:participators])
  end

  def create_dialogue(sender_id, reciever_id) do
    import Ecto.Query, only: [from: 2]
    import Ecto.Query.API, only: [fragment: 1]
    import Enum, only: [member?: 2]

    alias StixServer.Schemas.Dialogue

    arr = [sender_id, reciever_id]
    reverted_arr = [reciever_id, sender_id]


    dialogue = (from d in Dialogue, 
      where: (d.participators == ^arr or d.participators == ^reverted_arr),
      select: d) 
      |> StixServer.Repo.one()

    case dialogue do
      nil -> 
        changeset = StixServer.Schemas.Dialogue.changeset(%StixServer.Schemas.Dialogue{}, %{participators: [sender_id, reciever_id]})

        IO.inspect(changeset)

        case StixServer.Repo.insert(changeset) do
          {:ok, struct} -> {:ok, struct}
          {:error, changeset} -> {:error, "not valid"}
        end

      _ -> {:ok, "dialogue exists"}
    end
  end
end
