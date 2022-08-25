import {Resource} from "react-admin";
import student from "../../resources/student";
import {Esamwaad} from "../../resources/user";
import ShikshaSaathi from "../../resources/user/shikshaSaathi";
import location from "../../resources/location";
import school from "../../resources/student";
import gradeAssessment from "../../resources/gradeAssessment";
import * as React from "react";

const MenuOptions = [
    {
        name: "Student",
        resource: 'student',
        props: student
    },
    {
        name: "E Samwaad Users",
        resource: 'e_samwaad_user',
        props: Esamwaad
    },
    {
        name: "Shiksha Saathi Users",
        resource: 'shiksha_saathi_user',
        props: ShikshaSaathi
    },
    {
        name: "School",
        resource: 'school',
        props: school
    },
    {
        name: "Grade Assessment",
        resource: 'gradeAssessment',
        props: gradeAssessment
    },

];

export default MenuOptions;
