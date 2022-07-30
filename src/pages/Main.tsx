import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchCharactersQuery } from "../store/api/star-wars.api";
import { useDebounce } from "../hooks/debounce";
import DefaultLayout from "../components/DefaultLayout";

function Main() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const {
    isLoading,
    isError,
    data: characters,
  } = useSearchCharactersQuery(debouncedSearch, {
    refetchOnFocus: true,
  });
  return (
    <DefaultLayout>
      <div className="p-[20px] bg-white w-[350px] border">
        <h2 className="font-bold mb-2">Characters</h2>
        <input
          type="text"
          className="w-full h-[42px] mb-2 border p-2"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul className="list-none w-full overflow-y-scroll max-h-[500px]">
          {isLoading && <p className="text-center">Loading...</p>}
          {isError && <p className="text-center">Something went wrong...</p>}
          {characters?.map((character) => (
            <Link key={character.id} to={`character/${character.id}`}>
              <li className="p-2 bg-slate-300 mb-2 hover:bg-slate-500 cursor-pointer">
                {character.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </DefaultLayout>
  );
}

export default Main;
