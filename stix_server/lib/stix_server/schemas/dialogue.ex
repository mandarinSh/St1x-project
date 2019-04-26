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
end
