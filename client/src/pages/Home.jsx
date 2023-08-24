import { useEffect, useState } from "react";

import { Loader, Card, FormFile } from "../components";
import Footer from "../components/Footer";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [AllPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch("https:dall-e-3v2f.onrender.com/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
    setTimeout(() => {
      const searchResults = AllPosts.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.prompt.toLowerCase().includes(searchText.toLowerCase()))

          setSearchedResults(searchResults)
    }, 500)
    )
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Destaque da Comunidade
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Explore uma seleção de imagens e visualmente deslumbrantes criadas
          pela inteligência artificial DALL-E.
        </p>
      </div>

      <div className="mt-16">
        <FormFile 
        labelName='Search posts'
        type='text'
        name='text'
        placeholder='Search posts'
        value={searchText}
        handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2
                className="font-medium text-[#666e75]
            text-xl mb-3
            "
              >
                Exibindo resultados para
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="Nenhum resultado de busca encontrado."
                />
              ) : (
                <RenderCards data={AllPosts} title="Nenhum post encontrado." />
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </section>
  );
};

export default Home;
