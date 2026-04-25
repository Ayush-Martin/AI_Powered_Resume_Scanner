import { useEffect, useState } from "react";

interface IUsePaginatedData {
  currentPage: number;
  getData: (data: any) => void;
  changePage: (page: number) => void;
  size?: number;
  initialSearch?: string;
}

const usePaginatedData = ({
  currentPage,
  getData,
  changePage,
  size = 10,
  initialSearch = ""
}: IUsePaginatedData) => {
  const [search, setSearch] = useState(initialSearch);

  // Initial load
  useEffect(() => {
    getData({ page: currentPage, search, size });
  }, []);

  // Handle search changes
  useEffect(() => {
    // Reset to page 1 on search
    if (currentPage !== 1) {
      changePage(1);
    }
    getData({ page: 1, search, size });
  }, [search]);

  const previousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      changePage(newPage);
      getData({ page: newPage, search, size });
    }
  };

  const nextPage = (totalPages: number) => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      changePage(newPage);
      getData({ page: newPage, search, size });
    }
  };

  const searchHandler = (searchInput: string) => {
    setSearch(searchInput);
  };

  const refreshHandler = () => {
    getData({ page: currentPage, search, size });
  };

  return {
    previousPage,
    nextPage,
    searchHandler,
    search,
    refreshHandler,
  };
};

export default usePaginatedData;