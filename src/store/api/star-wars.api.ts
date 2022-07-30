import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICharacter, ServerResponse } from "../../models/models";
export const starWarsApi = createApi({
  reducerPath: "starWars/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swapi.dev/api/",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchCharacters: build.query<ICharacter[], string | undefined>({
      query: (search: string) => ({
        url: "people/",
        params: {
          search,
        },
      }),
      transformResponse: (response: ServerResponse<ICharacter>) =>
        response.results.map((result) => ({
          ...result,
          id: result.url.match(/people\/(\d+)/)?.[1] ?? "", // TODO get normal ID from API
        })),
    }),
    getCharacterById: build.query<ICharacter, string | undefined>({
      query: (id: string) => ({
        url: `people/${id}`,
      }),
    }),
  }),
});

export const { useSearchCharactersQuery, useGetCharacterByIdQuery } =
  starWarsApi;
export const useSearchCharactersQueryState =
  starWarsApi.endpoints.searchCharacters.useQueryState;
