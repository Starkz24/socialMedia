import {ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlined} from "@mui/icons-material";
import {Box, Typography, Divider, useTheme} from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import {useSelector} from "react-redux";
import { useState, useEffect,  } from "react";
import { useNavigate } from "react-router-dom";


const UserWiget = ({}) => {
    const [user, setUser] = useState(null);
    const {palette} = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state)
}