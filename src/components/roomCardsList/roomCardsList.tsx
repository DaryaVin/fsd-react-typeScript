import React, {useEffect} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FetchRooms, ChangeCurrentPage} from "../../store/actions/roomsListActions";
import { RootState } from '../../store/reducers/rootReducer';
import { Pagination } from '../pagination/pagination';
import { RoomCard } from '../roomCard/roomCard';

type CardsListProps = {

}
& React.HTMLAttributes<HTMLDivElement>
& ConnectorProps;
const CardsList = ({
  filterSettings,
  roomsState,
  FetchRooms,
  ChangeCurrentPage,
  ...props
}: CardsListProps) => {
  useEffect(() => {
    if (filterSettings && roomsState) {
      FetchRooms(filterSettings, roomsState?.pageSize, roomsState?.currentPage);
    }
   }, [filterSettings, roomsState?.pageSize, roomsState?.currentPage])
  return (
    <div {...props} className={'roomCardsList' + (props.className ? " " + props.className : "")}>
      <ul >
        {
        roomsState?.rooms
        ? roomsState.rooms.map((item) => {
          return <RoomCard {...item}/>
         })
        : "Ничего не найдено"
        }
      </ul>
      <Pagination
      currentPage={roomsState ? roomsState.currentPage : 1}
      totalCount={roomsState ? roomsState.totalCount : 0}
      pageSize={roomsState ? roomsState.pageSize : 0}
      onPageChange={ChangeCurrentPage}
      />
    </div>
  )
}
const mapStateToProps = (state: RootState) => {
  return ({
    filterSettings: state.filterRooms?.settings,
    roomsState: state.roomsList,
  })
}
const mapDispatchToProps = {
  FetchRooms,
  ChangeCurrentPage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const RoomCardsList = connector(CardsList);
