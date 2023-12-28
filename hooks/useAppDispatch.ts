import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

export default function useAppDispatch() {
    const dispatch = useDispatch<AppDispatch>();
    return dispatch;
}