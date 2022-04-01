async function fetchPosts() {
  const res = await fetch(
    "https://cloud.squidex.io/api/content/polyone/blogs/"
  );
  const json = await res.json();
  return json.items;
}

export async function getAllPostIds() {
  //const fileNames = fs.readdirSync(postsDirectory);

  const items = await fetchPosts();

  //   const res = await fetch(
  //     "https://cloud.squidex.io/api/content/polyone/blogs/"
  //   );
  //   const json = await res.json();
  //   //return json.items;
  return items.map((data) => {
    return {
      params: {
        id: data.id,
      },
    };
  });
}
