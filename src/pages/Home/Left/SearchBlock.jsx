import React from "react";
import styled from "styled-components/macro";
import SearchIcon from "../../../assets/icons/search.svg";

const SearchBlock = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <SearchContainer>
      <SearchbarContainer>
        <form className="search__form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            className="search__input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button className="search__button">
            <img src={SearchIcon} alt="search" className="search__icon" />
          </button>
        </form>
      </SearchbarContainer>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  background-color: #fff;
  border-radius: 0.4rem;
  border: 0.1rem solid #eaeaea;
`;

const SearchbarContainer = styled.div`
  padding: 1rem;

  .search__form {
    display: flex;
    align-items: center;
    border-radius: 0.4rem;
    border: 0.1rem solid #eaeaea;
  }

  .search__input {
    border: none;
    font-size: 1.6rem;
    padding: 0.6rem;
    outline: none;
    width: 100%;
    border-radius: 0.4rem;

    &::placeholder {
      color: #a9a9a9;
    }
  }

  .search__button {
    background-color: var(--secondary);
    padding: 0.6rem 0.8rem;
    border-radius: 0 0.3rem 0.3rem 0;
  }

  .search__icon {
    width: 2.4rem;
    height: 2.4rem;
  }

  @media (max-width: 768px) {
    .search__input {
      font-size: 1.4rem;
    }
  }
`;

export default SearchBlock;
