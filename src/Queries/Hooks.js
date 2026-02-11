import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllAnime = (pageNumber = 1, Limit = 25) => {
  return useQuery({
    queryKey: ["seasons", pageNumber, Limit],
    enabled: !!pageNumber,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 2,
    queryFn: async () => {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?limit=${Limit}&page=${pageNumber}`
      );
      return response.data;
    },
    select: (data) => data.data,
  });
};
const useGetEachAnime = (id) => {
  return useQuery({
    queryKey: ["each-anime", id],
    queryFn: async () => {
      const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
      return response.data;
    },
    select: (data) => data.data,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!id,
  });
};

const useGetTopAnime = (limit = 5, page = 1) => {
  return useQuery({
    queryKey: ["top-anime", limit, page],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.jikan.moe/v4/top/anime?limit=${limit}&page=${page}`
      );
      return res.data;
    },
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 5,
    retry: 2,
    enabled: page > 0,
  });
};
const useGetUpcommingAnime = (page = 1) => {
  return useQuery({
    queryKey: ["upcomming-anime", page],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.jikan.moe/v4/seasons/upcoming?limit=25&page=${page}`
      );
      return res.data;
    },
    select: (data) => data.data,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: page > 0,
    retry: 2,
  });
};

const useGetAnimeBySearch = (keyword) => {
  return useQuery({
    queryKey: ["AnimeBySearch", keyword],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${keyword}&limit=3`
      );
      return res.data;
    },
    select: (data) => data.data,
    refetchOnWindowFocus: false,
    retry: 2,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    enabled: !!keyword,
  });
};

const useGetAllAnimeBySearch = (keyword, page = 1) => {
  const normalizedKeyword = keyword?.trim();

  return useQuery({
    queryKey: ["AllAnimeBySearch", normalizedKeyword, page],
    queryFn: async () => {
      const res = await axios.get("https://api.jikan.moe/v4/anime", {
        params: { q: normalizedKeyword, page, limit: 25 },
      });
      return res.data;
    },
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 2,
    enabled: page >= 1 && Boolean(normalizedKeyword),
    refetchOnWindowFocus: false,
  });
};

const useAnimeCharacters = (id) =>
  useQuery({
    queryKey: ["anime-characters", id],
    queryFn: async () =>
      (await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`)).data,
    select: (res) => res.data,
    staleTime: 60_000,
    gcTime: 60_000,
    retry: 2,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

export {
  useGetAllAnime,
  useGetEachAnime,
  useGetTopAnime,
  useGetUpcommingAnime,
  useGetAllAnimeBySearch,
  useGetAnimeBySearch,
  useAnimeCharacters,
};
