
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type componentProps = {
    currentPage: number,
    handlePageChange: (page: number) => void,
    totalPages: number
}

const FlightPagination = ({totalPages, currentPage, handlePageChange}: componentProps) => {

    return <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious onClick={() => currentPage > 1 && handlePageChange(-1)}/>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">{currentPage}</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext onClick={() => handlePageChange(1)} />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
}

export default FlightPagination