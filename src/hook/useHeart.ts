import { Delete, Post } from "@/api/reactQuery/useMutations";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useOverlay } from "./useOverlay";
import { useLoginStore } from "@/stores/useLoginStore";

export const useHeart = ({ refetch }: { refetch?: () => void }) => {
  const navigate = useNavigate();
  const { isLogin } = useLoginStore();
  const { openConfirm } = useOverlay();

  const { mutate: favorite } = useMutation({
    mutationFn: ({ id }: { id: string | number }) => {
      return Post({ url: `client/favorite/${id}` });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: favoriteDelete } = useMutation({
    mutationFn: ({ id }: { id: string | number }) => {
      return Delete({ url: `client/favorite/${id}` });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const isFavoriteClick = (id: string | number, favorites: boolean) => {
    if (!isLogin) {
      openConfirm({
        title: "로그인이 필요한 서비스입니다.",
        message: "로그인 페이지로 이동하시겠습니까?",
        mainBtn: "로그인",
        subBtn: "취소",
        onFunc: () => {
          navigate("/login");
        },
      });
      return;
    }

    if (favorites) {
      favoriteDelete({ id });
      return;
    }
    favorite({ id });
  };

  return { isFavoriteClick };
};
