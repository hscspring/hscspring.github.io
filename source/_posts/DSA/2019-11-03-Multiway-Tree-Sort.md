---
title: Sort Based on Multiway Tree
date: 2019-11-03 23:00:00
categories: Coding
tags: [Python, Elixir, Tree, Sort, Multiway Tree]
---

Several weeks ago, we met a sort problem in our program of web app. We tried kinds of methods and finally have gotten a nearly 10 times performance improvement. The problem is very interesting and worth recording.

<!--more-->

## The Problem

Given a list of items, each item with a directory and a create_time, we need to sort those items by two rules:

- first rule: a given index_dict, only contains part of the items.
- second rule: when the first rule is not exist, use create_time.

Here is an example.

```elixir
# The given items
items = [
  %{ "location" => "/folder1", "create_time" => "2019-03-01" },
  %{ "location" => "/folder1/folder1-folder1", "create_time" => "2019-03-02" },
  %{ "location" => "/folder1/folder1-folder1/file1", "create_time" => "2019-03-10" },
  %{ "location" => "/folder1/folder1-folder1/file2", "create_time" => "2019-03-02" },
  %{ "location" => "/folder1/folder1-folder1/file3", "create_time" => "2019-03-04" },
  %{ "location" => "/folder1/folder1-folder1/file4", "create_time" => "2019-03-03" },
  %{ "location" => "/folder2", "create_time" => "2019-01-01" },
  %{ "location" => "/folder2/folder2-folder1", "create_time" => "2019-01-20" },
  %{ "location" => "/folder2/folder2-folder1/file1", "create_time" => "2019-01-22" },
  %{ "location" => "/folder2/folder2-folder1/file2", "create_time" => "2019-01-21" },
  %{ "location" => "/folder2/folder2-folder2", "create_time" => "2019-01-10" },
  %{ "location" => "/folder2/folder2-folder2/file1", "create_time" => "2019-01-11" },
  %{ "location" => "/folder2/folder2-folder2/file2", "create_time" => "2019-01-12" },
  %{ "location" => "/folder3", "create_time" => "2019-02-01" },
  %{ "location" => "/folder3/folder3-folder1", "create_time" => "2019-02-10" },
  %{ "location" => "/folder3/folder3-folder1/file1", "create_time" => "2019-02-12" },
  %{ "location" => "/folder3/folder3-folder1/file2", "create_time" => "2019-02-11" },
  %{ "location" => "/folder3/folder3-folder2", "create_time" => "2019-02-01" },
  %{ "location" => "/folder3/folder3-folder2/file1", "create_time" => "2019-02-03" },
  %{ "location" => "/folder3/folder3-folder2/file2", "create_time" => "2019-02-04" },
  %{ "location" => "/folder3/folder3-folder3", "create_time" => "2019-02-03" },
  %{ "location" => "/folder3/folder3-folder3/file1", "create_time" => "2019-02-05" },
  %{ "location" => "/folder3/folder3-folder3/file2", "create_time" => "2019-02-04" },
  %{ "location" => "/folder3/folder3-folder4", "create_time" => "2019-02-02" }
]

# The given index dict
%{
  "/folder1/folder1-folder1" => [
      "/folder1/folder1-folder1/file1",
      "/folder1/folder1-folder1/file2"
   ],
  "/folder2/folder2-folder1" => [
      "/folder2/folder2-folder1/file1",
      "/folder2/folder2-folder1/file2",
   ],
  "/folder2/folder2-folder2" => [
      "/folder2/folder2-folder2/file1",
      "/folder2/folder2-folder2/file2"
   ],
  "/folder3" => [
      "/folder3/folder3-folder1",
      "/folder3/folder3-folder2"
   ],
}
```

PAY attention, the given index dict might have different levels, and the map keys are out of order, the index order we need is actually the values.

What we want is like:

```elixir
['/',
 '/folder2',
 '/folder2/folder2-folder2',
 '/folder2/folder2-folder2/file1',
 '/folder2/folder2-folder2/file2',
 '/folder2/folder2-folder1',
 '/folder2/folder2-folder1/file1',
 '/folder2/folder2-folder1/file2',
 '/folder3',
 '/folder3/folder3-folder1',
 '/folder3/folder3-folder1/file2',
 '/folder3/folder3-folder1/file1',
 '/folder3/folder3-folder2',
 '/folder3/folder3-folder2/file1',
 '/folder3/folder3-folder2/file2',
 '/folder3/folder3-folder4',
 '/folder3/folder3-folder3',
 '/folder3/folder3-folder3/file2',
 '/folder3/folder3-folder3/file1',
 '/folder1',
 '/folder1/folder1-folder1',
 '/folder1/folder1-folder1/file1',
 '/folder1/folder1-folder1/file2',
 '/folder1/folder1-folder1/file4',
 '/folder1/folder1-folder1/file3']
```

Let me explain:

- “/folder1”, “/folder2” and “/folder3” are not in the index_dict, so they are sorted by create_time: “/folder2” > “/folder3” > “/folder1”
- then, Let’s loot at the subfolders of folder2. “/folder2/folder2-folder1” and “/folder2/folder2-folder2” are also not in the index_dict (values), so they are sorted by create_time: “/folder2/folder2-folder2” > “/folder2/folder2-folder1”

- then, their subdirectories (here are files), although “/folder2/folder2-folder1/file2” > “/folder2/folder2-folder1/file1” by create_time, in the index_dict, “file1” > “file2”, so the result is ‘/folder2/folder2-folder1/file1’ > ‘/folder2/folder2-folder1/file2’.

- Another example, let’s look at folder3, they have sub folders in the index_dict, so sub folders need to be sorted like that: ‘/folder3/folder3-folder1’ > ‘/folder3/folder3-folder2’, then ‘/folder3/folder3-folder4’ > ‘/folder3/folder3-folder3’, by their create_time.

We need to remind you several points again:

- the directory locations might be multi-levels
- the index keys might be any parent directory location, and they are out of order (dict)
- the each index values are not one-to-one with the items (may be more or less)
- sub folder or sub files must be created after their parent

## First Naive Solution

It was my first time to use Elixir, so I quickly got an easy solution: sort by levels. Here is a small example:

```elixir
items = ["/c/3", "/a/3", "/b/2", "/a/1", "c/1", "/a/2", "/b/1"]
standard = ["/b", "/a", "/c"]
Enum.sort_by(items, &Enum.find_index(standard, fn x-> x == get_parent_loc(&1) end))
```

First of all, we sort all the items by their create_time. Then, at each level, we first check if there is an index in the index dict. If is, that's just the standard for the sub directories. If is not, we  do nothing.

So the solution may like the following (we only list the key code).

```elixir
defmodule Sorter do

  def build_item_level(item_list) do
    item_list 
    |> Enum.sort_by(&Map.get(&1, "create_time"))
    |> Enum.map(fn x -> Map.get(x, "location") end)
    |> build_location_level()
  end

  def build_index_level(index_dict) do
    index_dict
    |> Enum.reduce([], fn {_, children}, index_list ->
      [children | index_list]
    end)
    |> Enum.reverse()
    |> List.flatten()
    |> build_location_level()
  end

  def combine_item_index_level(item_level, index_level) do
    Enum.reduce(item_level, %{}, fn {level, items}, combined_level ->
    index = Map.get(index_level, level, [])
    not_in_index = Enum.filter(items, fn x ->
      Enum.member?(index, x) == false
    end)
    combined = index ++ not_in_index
    Map.put(combined_level, level, combined)
    end)
  end

  def sort_level_items(combined_level) do
    combined_level
    |> Enum.reduce(%{}, fn {level, items}, sorted_items ->
    standard = Map.get(sorted_items, level-1, [])
    sorted = Enum.sort_by(items, &Enum.find_index(standard, fn x ->
      x == get_parent_location(&1)
    end))
    Map.put(sorted_items, level , sorted)
    end)
  end

  def combine_sorted_items(sorted_items) do
    locs_dict = %{"/" => "00000"}
    sorted_items
    |> Enum.reduce([], fn {_, items}, level_list ->
      [items | level_list]
    end)
    |> Enum.reverse()
    |> add_tag_to_location(locs_dict)
    |> Enum.sort_by(fn {_, tag} -> tag end)
    |> Enum.map(fn {loc, _} -> loc end)
  end

  def sort(item_list, index_dict) do
    index_level = build_index_level(index_dict)
    item_list
    |> build_item_level()
    |> combine_item_index_level(index_level)
    |> sort_level_items()
    |> combine_sorted_items() 
  end
end
```

That seems a little complex, but easy to understand:

- First, we build levels from both items and indexes, the result is a map (dict) with location (directory) level as key and location as value.
- Then, we combine each level locations, make sure that index level locations are ahead of item level locations.
- After that, we just sort the combined level locations by their parent location from the top level to the last level, just like what we've mentioned in the above simple example.
- At last, we need to adjust the locations, make sure the children locations are following their parent location instead of grouped by levels.

For the whole code, please go [here](https://github.com/hscspring/The-DataStructure-and-Algorithms/blob/master/Tree/MultiwayTree/sort_by_level.ex).

## A Normal One

The problem is obviously a tree problem, so we tried a tree solution with the help of [Elixir Forum](https://elixirforum.com/). Thanks to those enthusiastic guys, we found a way to build the tree, and we sorted the items in Depth-First traversal. The solution main code is here.

```elixir
defmodule Sorter do

  def build_tree(paths) do
    paths
    |> Enum.map(&path_to_tree/1)
    |> Enum.reduce(%{}, &deep_merge/2)
  end

  def path_to_tree(path) do
    pdict = path
    |> String.split("/")
    |> Enum.drop(1)
    |> Enum.reduce([], fn x, paths ->
      parent = Enum.at(paths, 0) || " " # actually is ""
      [parent <> "/" <> x  | paths]
    end)
    |> Enum.reduce(%{}, fn segment, inner_tree ->
      %{segment => inner_tree}
    end)
    %{"/" => pdict}
  end
  
  def deep_merge(map1, map2) do
    Map.merge(map1, map2, fn _, val1 = %{}, val2 = %{} ->
      deep_merge(val1, val2)
    end)
  end
  
  def dft_with_sort([], res, _time_sorted_locs, _indexes), do: res

  def dft_with_sort(stack, res, time_sorted_locs, indexes) do
    {curr, remain} = List.pop_at(stack, -1)

    {key, values} = List.first(Map.to_list(curr))

    sorter = 
    [Map.get(indexes, key, []) | time_sorted_locs] 
    |> List.flatten()

    new = values
    |> Map.to_list()
    |> Enum.sort_by(&{Enum.find_index(sorter, fn x -> 
      x ==  List.first(Tuple.to_list(&1)) 
    end)})
    |> Enum.map(fn {key, value} -> %{key => value} end)
    |> Enum.reverse()

    res = [key | res]

    [remain | new] 
    |> List.flatten() 
    |> dft_with_sort(res, time_sorted_locs, indexes)
  end

  def sort(item_list, index_dict) do
    sorted_locs = item_list
    |> Enum.sort_by(&Map.get(&1, "create_time"))
    |> Enum.map(fn x -> Map.get(x, "location") end)

    tree = build_tree(sorted_locs)
    dft_with_sort([tree], [], sorted_locs, index_dict) |> Enum.reverse()
  end
end
```

This code is much harder than the former one. Here we will explain the key functions.

`path_to_tree` is to make a string path to a tree, for example:

```elixir
path = "/a/b/c/d"
path_to_tree(path) == %{"/" => %{"/a" => %{"/a/b" => %{"/a/b/c" => %{"/a/b/c/d" => %{}}}}}}
```

`deep_merge` is to merge two maps, for example:

```elixir
map1 = %{"/" => %{"/a" => %{"/a/b" => %{"/a/b/c" => %{"/a/b/c/d" => %{}}}}}}
map2 = %{"/" => %{"/1" => %{"/1/2" => %{}}}}
deep_merge(map1, map2) == %{
  "/" => %{
    "/1" => %{"/1/2" => %{}},
    "/a" => %{"/a/b" => %{"/a/b/c" => %{"/a/b/c/d" => %{}}}}
  }
}
```

Then is the most import function `dft_with_sort`, we need to sort our items when traversing depth-first.

We need a stack to store tree nodes, at the very first, there is only one node: the root node. With the popped node, we get a current subtree and a list of remained subtrees. The key of the current subtree is then added to the result list. This is our first item. Then the values need to be sorted by our given index. So we build a sorter, which is just the standard with index items ahead of create_time sorted items.

```elixir
values
|> Map.to_list()
|> Enum.sort_by(&{Enum.find_index(sorter, fn x -> 
  x ==  List.first(Tuple.to_list(&1)) 
  end)})
|> Enum.map(fn {key, value} -> %{key => value} end)
|> Enum.reverse()
```

`Map.to_list()` changes the key=>value to a tuple (key, value), for example: 

```elixir
map = %{
  "/folder2/folder2-folder1" => %{
    "/folder2/folder2-folder1/file1" => %{},
    "/folder2/folder2-folder1/file2" => %{}
  },
  "/folder2/folder2-folder2" => %{
    "/folder2/folder2-folder2/file1" => %{},
    "/folder2/folder2-folder2/file2" => %{}
  }
}
Map.to_list(map) = [
  {"/folder2/folder2-folder1",
   %{
     "/folder2/folder2-folder1/file1" => %{},
     "/folder2/folder2-folder1/file2" => %{}
   }},
  {"/folder2/folder2-folder2",
   %{
     "/folder2/folder2-folder2/file1" => %{},
     "/folder2/folder2-folder2/file2" => %{}
   }}
]
```

`List.first(Tuple.to_list(&1))` gets the key (location) and values then sort by sorter (standard). Finally we change the tuple back to dict and reverse the order. 

Why we need to reverse the order here? Because we will pop from the last one next time. `[remain | new]` is the new stack, we are traversing depth-first.

Another key point is `dft_with_sort([], res, _time_sorted_locs, _indexes)`, this is used to return our final result when stack is empty.

For the whole code, please go [here](https://github.com/hscspring/The-DataStructure-and-Algorithms/blob/master/Tree/MultiwayTree/sort_by_tree.ex).

## The Ultimate Weapon

When we used the former solutions to our production, we were not satisfied with the performance. Because this module is used very frequently, so we need a much quicker one. With some more research, we found it -- add a parent for each location, and let the tree contain the needed order. Here is our reference: [elixir - Create a hierarchical data structure from a flat list with parent_id - Stack Overflow](https://stackoverflow.com/questions/42577866/create-a-hierarchical-data-structure-from-a-flat-list-with-parent-id).

```elixir
defmodule Sorter do

  def build_tree(list, index_dict) do
    tree = list
    |> Enum.reduce(%{}, fn foo, map ->
      foo = %{foo | children: Map.get(map, foo.location, [])}

      Map.update(map, foo.parent, [foo], fn foos ->
        children = [foo | foos]

        case Map.get(index_dict, foo.parent) do
          nil ->
            children

          index_list ->
            children
            |> Enum.sort_by(&(Enum.find_index(index_list, fn item ->
              item == &1.location
            end)))
        end
      end)
    end)
    |> Map.get(nil)
  end

  def dft([], res), do: res
  def dft(stack, res) do
    {curr, remain} = List.pop_at(stack, -1)
    res = [curr.location | res]
    [remain | Enum.reverse(curr.children)] 
    |> List.flatten()
    |> dft(res)
  end

  def sort(item_list, index_dict) do
    item_list
    |> Enum.sort_by(& &1.create_time)
    |> add_parent()
    |> build_tree(index_dict)
    |> dft([])
    |> Enum.reverse()
  end

  def add_parent(item_list) do
    init = %{location: "/", parent: nil, children: []}
    item_list
    |> Enum.reduce([init], fn item, new_list ->
      parent = get_parent(item.location)
      new_item = %{location: item.location, parent: parent, children: []}
      [new_item | new_list]
    end)
  end
end
```

Pay attention, here we change our item structure to the following to get more convenient processing. 

```elixir
%{ location: "/folder1", create_time: "2019-03-01" }
```

Look at this smart thought, we have used less code, but more clearer and faster. The `dft` function is just like what we've seen before, but we do not need to sort. The core function here is the `build_tree` function. It does two main things: build a tree and sort when building. We must be very familiar with the sort part, it's almost the same as above, but much easier and clearer. Now let's focus on the build tree part. 

```elixir
defmodule Tree do
  def build_tree(list) do
    list
    |> Enum.reduce(%{}, fn foo, map ->
      foo = %{foo | children: Map.get(map, foo.location, [])}
      Map.update(map, foo.parent, [foo], fn foos ->
        [foo | foos]
      end)
    end)
    |> Map.get(nil)
  end
end
```

What does this do? Let's show you a simple example.

```elixir
list = [
  %{ location: "/", parent: nil, children: [] },
  %{ location: "/folder1", parent: "/", children: [] },
  %{ location: "/folder1/folder1-folder1", parent: "/folder1", children: [] },
  %{ location: "/folder2", parent: "/", children: [] },
  %{ location: "/folder2/folder2-folder1", parent: "/folder2", children: [] }
]
# tree
Sorter.build_tree(list) |> IO.inspect()
[%{children: [], location: "/", parent: nil}]
```

What happened here? Maybe we should remove the `Map.get(nil)` to see more.

```elixir
%{
  nil => [%{children: [], location: "/", parent: nil}],
  "/" => [
    %{children: [], location: "/folder2", parent: "/"},
    %{children: [], location: "/folder1", parent: "/"}
  ],
  "/folder1" => [
    %{children: [], location: "/folder1/folder1-folder1", parent: "/folder1"}
  ],
  "/folder2" => [
    %{children: [], location: "/folder2/folder2-folder1", parent: "/folder2"}
  ]
}
```

Now it's clear, let's explain some code in the function.

```elixir
foo = %{foo | children: Map.get(map, foo.location, [])}
```

This is used to update a key (here is the children key) of a map (here is foo). For a simple example:

```elixir
iex> map = %{one: 1, two: 2}
iex> %{map | one: "one"}
%{one: "one", two: 2}
```

Then the map update:

```elixir
# Map.update(map, key, initial, fun)
Map.update(map, foo.parent, [foo], fn foos -> [foo | foos] end)
```

The meaning is to update the value of the `foo.parent` key from `foos` to `[foo | foos]`. For a simple instance:

```elixir
iex >Map.update(%{a: 1}, :a, 13, fn x -> x * 2 end)
%{a: 2}
```

Now we know exactly what the function do. It first updates children, then update this update to its parent. So we should use bottom-up approach to get the full tree. We just need to reverse the given list.

```elixir
Sorter.build_tree(list |> Enum.reverse())
tree = [
    %{
      children: [
        %{
          children: [
            %{
              children: [],
              location: "/folder1/folder1-folder1",
              parent: "/folder1"
            }
          ],
          location: "/folder1",
          parent: "/"
        },
        %{
          children: [
            %{
              children: [],
              location: "/folder2/folder2-folder1",
              parent: "/folder2"
            }
          ],
          location: "/folder2",
          parent: "/"
        }
      ],
      location: "/",
      parent: nil
    }
  ]
```

You could play with the code [here](https://github.com/hscspring/The-DataStructure-and-Algorithms/blob/master/Tree/MultiwayTree/build.ex). Believe me, it's very interesting.

Actually, this method can be used in many fields, especially in the tree data structure. Additionally, use id instead of the real value will always process much faster.

## Summary

In this article, we have introduced a typical case of multiway tree. We have shown how to build it based on item values and their parents. We have also shown how to sort the tree by some external conditions. In fact, we believe this case could be used in many fields in your routine work.

By the way, what we have mentioned above is just a simplified sample. Actually we did many optimization in the real world. For example, we sorted the items when querying from database; we cached the result in Redis, and so on.

