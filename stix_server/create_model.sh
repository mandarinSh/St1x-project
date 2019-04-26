#!/bin/sh

# User schema. id, nickname, hashed_password

mix phx.gen.schema Schemas.User users nickname:unique hashed_password

mix ecto.migrate


# Conversation schema

mix phx.gen.schema Schemas.Dialogue dialogues participators:array:integer

mix ecto.migrate


# Messages schema

mix phx.gen.schema Schemas.Message messages dialogue_id:references:dialogues sender_id:references:users receiver_id:references:users message_body:text

mix ecto.migrate
