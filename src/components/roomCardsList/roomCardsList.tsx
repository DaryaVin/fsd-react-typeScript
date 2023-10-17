import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FetchRooms, ChangeCurrentPage } from "../../store/actions/roomsListActions";
import { RootState } from '../../store/reducers/rootReducer';
import { Pagination } from '../pagination/pagination';
import { RoomCard } from '../roomCard/roomCard';
import { FlexContainer } from '../flexContainer/flexContainer';
import { PiSmileySadFill } from "react-icons/pi";

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
    // console.log("RoomCardsList useEffect");

    if (filterSettings && roomsState) {
      FetchRooms(filterSettings, roomsState?.pageSize, roomsState?.currentPage);
    }
  }, [filterSettings, roomsState?.pageSize, roomsState?.currentPage])
  if (roomsState?.isLoading) return (
    <FlexContainer {...props}
      className={'roomCardsList' + (props.className ? " " + props.className : "")}
      justifyContent='center'
    >
      Идет загрузка...
    </FlexContainer>
  )
  if (roomsState?.totalCount === 0) return (
    <FlexContainer {...props}
      className={'roomCardsList' + (props.className ? " " + props.className : "")}
      justifyContent='center'
      flexDirection='colomn'
      rowGap={30}

    >
      <FlexContainer 
      justifyContent='center'
      >
        <svg className='bulletItem__iconGradient'>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset={0} />
              <stop offset={"95%"} />
            </linearGradient>
          </defs>
        </svg>
        <PiSmileySadFill fill={"url(#gradient)"} size={100} width={100} height={100} />
      </FlexContainer>
      <FlexContainer
      justifyContent='center'
      >
      По вашему запросу ничего не найдено
      </FlexContainer>
    </FlexContainer>
  )
  return (
    <div {...props} className={'roomCardsList' + (props.className ? " " + props.className : "")}>
      <FlexContainer
        flexWrap='wrap'
        rowGap={10}
        columnGap={10}
        justifyContent='space-around'
      >
        <ul >
          {
            roomsState?.rooms
              ? roomsState.rooms.map((item) => {
                return <RoomCard {...item} />
              })
              : "Ничего не найдено"
          }
        </ul>
      </FlexContainer>
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
