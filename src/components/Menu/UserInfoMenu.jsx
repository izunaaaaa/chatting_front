import React, { useRef } from "react";
import {
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
  Avatar,
  Badge,
  AvatarBadge,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ActiveBadge from "../Badge/ActiveBadge";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { logout } from "../../services/api";

function UserInfoMenu({ user }) {
  const navigate = useNavigate();

  const onChatList = () => {
    navigate(`/chatList`);
  };

  const onProfile = () => {
    navigate(`/profile/${user?.username}`);
  };
  const queryClient = useQueryClient();
  const toast = useToast();
  const toastId = useRef();

  const mutation = useMutation(logout, {
    onMutate: () => {
      toastId.current = toast({
        position: "top",
        title: "Log Out...!",
        description: "See you later!",
        status: "loading",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "Success log out!",
          description: `Bye, Bye ${user?.username}!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        queryClient.refetchQueries(["me"]);
        navigate("/");
      }
    },
  });
  const onLogOut = () => {
    mutation.mutate();
  };

  return (
    <Menu>
      <MenuButton>
        <Avatar src={user?.avatar} name={user?.name} size="sm">
          <AvatarBadge boxSize="0.9rem" bg="green.500" />
        </Avatar>
      </MenuButton>
      {/* <Badge colorScheme="green">Login</Badge> */}
      <MenuList>
        <MenuItem onClick={onChatList}>채팅내역</MenuItem>
        <MenuItem onClick={onProfile}>마이페이지</MenuItem>
        <MenuItem>판매하기</MenuItem>
        <MenuItem onClick={onLogOut}>로그아웃</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserInfoMenu;
