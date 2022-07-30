import { Link, useParams } from "react-router-dom";
import {
  useGetCharacterByIdQuery,
  useSearchCharactersQueryState,
} from "../store/api/star-wars.api";
import DefaultLayout from "../components/DefaultLayout";

function Character() {
  let { id } = useParams();

  const { dataFromState } = useSearchCharactersQueryState("", {
    selectFromResult: ({ data }) => ({
      dataFromState: data?.find((item) => item.id === id),
    }),
  });

  const {
    isLoading,
    isError,
    data: dataFromServer,
  } = useGetCharacterByIdQuery(id, {
    skip: Boolean(dataFromState),
  });

  const resultData = dataFromState || dataFromServer;

  console.log("render Character");

  return (
    <DefaultLayout>
      <div className="p-[20px] bg-white w-[350px] border">
        {isLoading && <p className="text-center">Loading...</p>}
        {isError && <p className="text-center">Something went wrong...</p>}
        {Boolean(resultData) && (
          <div>
            <h2 className="font-bold mb-2">{resultData?.name}</h2>
            <p className="mb-1">Gender: {resultData?.gender}</p>
            <p className="mb-1">Mass: {resultData?.mass}</p>
            <p className="mb-1">Height: {resultData?.height}</p>
            <p className="mb-1">Eye: {resultData?.eye_color}</p>
            <p className="mb-1">BirthDate: {resultData?.birth_year}</p>
          </div>
        )}
        <Link
          to="/"
          className="bg-slate-300 hover:bg-slate-500 text-black py-2 px-4 mt-[20px] w-full block text-center"
        >
          Back to main
        </Link>
      </div>
    </DefaultLayout>
  );
}

export default Character;
