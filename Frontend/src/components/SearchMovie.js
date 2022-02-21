import TextField from "@mui/material/TextField";
const SearchMovie = () => {
    return (
<div className="main">
      
<div className="search">
  <TextField
    id="outlined-basic"
    variant="outlined"
    
    label="Search"
  />
  
</div>
<Button endIcon={<Search />}  className="links" onClick={event =>  window.location.href='/'}>
 Search
</Button>
</div>
)
}
export default SearchMovie ;