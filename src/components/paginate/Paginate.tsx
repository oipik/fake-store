import { memo } from "react";
import ReactPaginate from "react-paginate";

interface IPaginateProps {
  initialPage: number;
  pageCount: number;
  handlePageClick: ({ selected }: { selected: number }) => void;
}

const Paginate: React.FC<IPaginateProps> = memo(({ initialPage, pageCount, handlePageClick }) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      pageCount={pageCount}
      nextLabel={"Next"}
      onPageChange={handlePageClick}
      containerClassName="flex flex-wrap items-center justify-center mt-6 space-x-4 "
      pageClassName="mb-4 sm:mb-0 border border-solid border-lightGray rounded-3xl hover:bg-default hover:text-white"
      pageLinkClassName="cursor-pointer block w-10 h-10 flex items-center justify-center "
      activeClassName="bg-default text-white"
      forcePage={initialPage}
    />
  )
});

export default Paginate;