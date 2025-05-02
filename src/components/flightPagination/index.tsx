
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
    flightsPerPage: number
}


const FlightPagination = ({flightsPerPage, currentPage, handlePageChange}: componentProps) => {



    return <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious onClick={() => currentPage > 0 && handlePageChange(-1)}/>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink >{currentPage + 1}</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext onClick={() => currentPage < flightsPerPage-1 && handlePageChange(1)} />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
}

export default FlightPagination