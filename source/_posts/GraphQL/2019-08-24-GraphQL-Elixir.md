---
title: GraphQL Elixir Glance
date: 2019-08-24 18:00:00
categories: Coding
tags: [GraphQL, Elixir]
---

> There are several problems with the origin docs, so I reproduced this quick glance. It's much simple and only contains the brief information. Hope this is helpful to u.

## Getting Started

Schema-Driven Development

- Define your types and the appropriate queries and mutations for them.
- Implement functions called **resolvers** to handle these types and their fields.
- As new requirements arrive, go back to step 1 to update the schema, and continue through the other steps.

```bash
# Step1: create
$ mix phx.new community --no-html

# Step2: add dependencies to `mix.exs`
{:dataloader, "~> 1.0.0"}, # absinthe_ecto was DEPRECATED
{:absinthe_plug, "~> 1.4.0"}

# Step3: modify database info in `config/dev.exs`
# maybe you should modify username or password

# Step4: install deps
$ mix deps.get

# Step5: generate tables and seed data
$ mix phx.gen.context News Link links url:string description:text

# Step6: add seed data in `priv/repo/seeds.exs`
alias Community.News.Link
alias Community.Repo
%Link{url: "http://graphql.org/", description: "The Best Query Language"} |> Repo.insert!
%Link{url: "http://dev.apollodata.com/", description: "Awesome GraphQL Client"} |> Repo.insert!

# Step7: setup ecto (create + migrate)
$ mix ecto.setup
```

You should see two pieces of items in the `links` table.

<!--more-->

## Queries

**Step1: Defining the Schema**

Add a `:link` object to the schema, and an `:all_links` field to the root query object

```elixir
# lib/community_web/schema.ex
defmodule CommunityWeb.Schema do
  use Absinthe.Schema

  alias CommunityWeb.NewsResolver

  object :link do
    field :id, non_null(:id)
    field :url, non_null(:string)
    field :description, non_null(:string)
  end

  query do
    # allLinks is still ok, all_links is for elixir idiomatic
    field :all_links, non_null(list_of(non_null(:link)))
  end
end
```

**Step2: Query Resolver**

Resolvers are just functions mapped to GraphQL fields, with their actual behavior.

```elixir
# lib/community_web/schema.ex
field :all_links, non_null(list_of(non_null(:link))) do
  resolve &NewsResolver.all_links/3
end
# lib/community_web/resolvers/news_resolver.ex
defmodule CommunityWeb.NewsResolver do
  alias Community.News

  def all_links(_root, _args, _info) do
    links = News.list_links()
    {:ok, links}
  end
end
```

**Step3: Router**

```elixir
# lib/community_web/router.ex
defmodule CommunityWeb.Router do
  use CommunityWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/" do
    pipe_through :api

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: CommunityWeb.Schema,
      interface: :simple,
      context: %{pubsub: CommunityWeb.Endpoint}
  end

end
```

Launch server：`iex -S mix phx.server`, open [localhost:4000/graphiql](http://localhost:4000/graphiql) to query:

![](http://qnimg.lovevivian.cn/html-graphql-elixir-tutorial-1.jpeg)

## Mutations

**Mutation for creating links**

```elixir
# lib/community_web/schema.ex
mutation do
  field :create_link, :link do
    arg :url, non_null(:string)
    arg :description, non_null(:string)

    resolve &NewsResolver.create_link/3
  end
end
```

**Resolvers with arguments**

```elixir
# lib/community_web/resolvers/news_resolver.ex
def create_link(_root, args, _info) do
  # TODO: add detailed error message handling later
  case News.create_link(args) do
    {:ok, link} ->
      {:ok, link}
    _error ->
      {:error, "could not create link"}
  end
end
```

Query again:

![](http://qnimg.lovevivian.cn/html-graphql-elixir-tutorial-2.jpeg)

We've done. It's very easy so I didn't push the code to GitHub

## References

- [Building a GraphQL Server with Elixir Backend Tutorial](https://www.howtographql.com/graphql-elixir/0-introduction/)