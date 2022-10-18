import gql from "graphql-tag";

// Define the additional fields that we want.
export const EXTENDED_STUDENT_RECORD = gql`
  {    
    school {
        name
        udise
        location {
          district
          block
          cluster
        }
    }
  }
`;
