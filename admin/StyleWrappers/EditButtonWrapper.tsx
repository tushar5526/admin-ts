import { EditButton } from "react-admin";

const EditButtonWrapper = (props: any) => {
    return (
        <EditButton
            sx={
                {
                    color: "green",
                    backgroundColor : "#fffffe",
                    border: 1,
                }
            } />
    );
};

export default EditButtonWrapper;