import gql from "graphql-tag";

// Define the additional fields that we want.
export const EXTENDED_ASSESSMENT_RECORD = gql`
  {    
    deadline{
        district
        date
    }
  }
`;
