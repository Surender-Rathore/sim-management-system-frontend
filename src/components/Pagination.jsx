import PropTypes from "prop-types";
import { Pagination as RsPagination, PaginationItem, PaginationLink } from "reactstrap";
import "../styles/pagination.css"

const Pagination = ({currentPage, totalPages, onPageChange}) => {
  if (totalPages <= 1) return null;
  const pages = Array.from({length:totalPages}, (_, i) => i+1)
        return (
                <RsPagination className="justify-content-center gap-2 mt-3" aria-label="SIM list pages" >
                        <PaginationItem disabled={currentPage === 1}>
                                <PaginationLink previous onClick={()=> onPageChange(currentPage - 1)}/>
                        </PaginationItem>

                {
                        pages.map((page) =>(
                                <PaginationItem key={page} active={page === currentPage}>
                                        <PaginationLink onClick={()=>onPageChange(page)}>
                                                {page}
                                        </PaginationLink>
                                </PaginationItem>                                
                        )
                )
        }

        <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink next onClick={()=> onPageChange(currentPage + 1)} />
        </PaginationItem>
        </RsPagination>
  );
};


Pagination.prototype = {
        currentPage:PropTypes.number.isRequired,
        totalPages:PropTypes.number.isRequired,
        onPageChange:PropTypes.func.isRequired,
}

export default Pagination