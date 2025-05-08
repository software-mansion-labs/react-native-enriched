import { FlatList, type ListRenderItemInfo, StyleSheet } from 'react-native';
import { ToolbarButton } from './ToolbarButton';
import type {
  OnChangeStyleEvent,
  RichTextInputInstance,
} from '@swmansion/react-native-rich-text-editor';
import type { FC } from 'react';

const STYLE_ITEMS = [
  {
    name: 'bold',
    icon: 'bold',
  },
  {
    name: 'italic',
    icon: 'italic',
  },
  {
    name: 'underline',
    icon: 'underline',
  },
  {
    name: 'strikethrough',
    icon: 'strikethrough',
  },
  {
    name: 'inline-code',
    icon: 'code',
  },
  {
    name: 'heading-1',
    text: 'H1',
  },
  {
    name: 'heading-2',
    text: 'H2',
  },
  {
    name: 'heading-3',
    text: 'H3',
  },
  {
    name: 'quote',
    icon: 'quote-right',
  },
  {
    name: 'code-block',
    icon: 'file-code-o',
  },
  {
    name: 'image',
    icon: 'image',
  },
  {
    name: 'link',
    icon: 'link',
  },
  {
    name: 'mention',
    icon: 'at',
  },
  {
    name: 'unordered-list',
    icon: 'list-ul',
  },
  {
    name: 'ordered-list',
    icon: 'list-ol',
  },
] as const;

type Item = (typeof STYLE_ITEMS)[number];
type StylesState = OnChangeStyleEvent;

export interface ToolbarProps {
  stylesState: StylesState;
  editorRef?: React.RefObject<RichTextInputInstance | null>;
  onOpenLinkModal: () => void;
  onSelectImage: () => void;
}

export const Toolbar: FC<ToolbarProps> = ({
  stylesState,
  editorRef,
  onOpenLinkModal,
  onSelectImage,
}) => {
  const handlePress = (item: Item) => {
    const currentRef = editorRef?.current;
    if (!currentRef) return;

    switch (item.name) {
      case 'bold':
        editorRef.current?.toggleBold();
        break;
      case 'italic':
        editorRef.current?.toggleItalic();
        break;
      case 'underline':
        editorRef.current?.toggleUnderline();
        break;
      case 'strikethrough':
        editorRef.current?.toggleStrikeThrough();
        break;
      case 'inline-code':
        editorRef?.current?.toggleInlineCode();
        break;
      case 'heading-1':
        editorRef.current?.toggleH1();
        break;
      case 'heading-2':
        editorRef.current?.toggleH2();
        break;
      case 'heading-3':
        editorRef.current?.toggleH3();
        break;
      case 'code-block':
        editorRef?.current?.toggleCodeBlock();
        break;
      case 'quote':
        editorRef?.current?.toggleBlockQuote();
        break;
      case 'unordered-list':
        editorRef.current?.toggleUnorderedList();
        break;
      case 'ordered-list':
        editorRef.current?.toggleOrderedList();
        break;
      case 'link':
        onOpenLinkModal();
        break;
      case 'image':
        onSelectImage();
        break;
      case 'mention':
        editorRef.current?.startMention();
        break;
    }
  };

  const isActive = (item: Item) => {
    switch (item.name) {
      case 'bold':
        return stylesState.isBold;
      case 'italic':
        return stylesState.isItalic;
      case 'underline':
        return stylesState.isUnderline;
      case 'strikethrough':
        return stylesState.isStrikeThrough;
      case 'inline-code':
        return stylesState.isInlineCode;
      case 'heading-1':
        return stylesState.isH1;
      case 'heading-2':
        return stylesState.isH2;
      case 'code-block':
        return stylesState.isCodeBlock;
      case 'quote':
        return stylesState.isBlockQuote;
      case 'unordered-list':
        return stylesState.isUnorderedList;
      case 'ordered-list':
        return stylesState.isOrderedList;
      case 'link':
        return stylesState.isLink;
      case 'image':
        return stylesState.isImage;
      case 'mention':
        return stylesState.isMention;
      default:
        return false;
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<Item>) => {
    return (
      <ToolbarButton
        {...item}
        isActive={isActive(item)}
        onPress={() => handlePress(item)}
      />
    );
  };

  const keyExtractor = (item: Item) => item.name;

  return (
    <FlatList
      horizontal
      data={STYLE_ITEMS}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
