import { useState } from "react";
import { MdClose } from "react-icons/md";
import { paragraphFont, titleFont } from "@/utils/fonts";
import { FaChevronDown } from "react-icons/fa";
import { useCurrentBookDataContext } from "@/app/context/CurrentBookData";

const Note = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState<number>(0);
  const [verse, setVerse] = useState<number>(0);
  const [userTheme, setUserTheme] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(true);
  const [workspaceId, setwWorkspaceId] = useState<any>(null);

  const { userId } = useCurrentBookDataContext();

  return <></>;
};

export default Note;
