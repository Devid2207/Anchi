import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import {connect} from 'react-redux';

import CustomButton, {CustomButtonOutline} from '../components/CustomButton';
import GlobalStyle from '../styles/GlobalStyle';
import {Icons} from '../components/icons';
import BlacklistItem from '../components/BlacklistItem';
import colors from '../constants/colors';

function Blacklist(props) {
  const [type, setType] = useState('food');
  const [blacklistFood, setBlacklistFood] = useState(
    props.foods.data.filter(item => props.blacklist.food.includes(item.id)),
  );
  const [blacklistRestaurant, setBlacklistRestaurant] = useState(
    props.foods.data.filter(item =>
      props.blacklist.restaurant.includes(item.id),
    ),
  );

  useEffect(() => {
    setBlacklistFood(state =>
      props.foods.data.filter(item => props.blacklist.food.includes(item.id)),
    );
  }, [props.blacklist.food]);

  useEffect(() => {
    setBlacklistRestaurant(state =>
      props.restaurants.data.filter(item =>
        props.blacklist.restaurant.includes(item.id),
      ),
    );
  }, [props.blacklist.restaurant]);

  return (
    <View style={GlobalStyle.content}>
      <CustomButton
        icon_name={type === 'food' ? 'hamburger' : 'store'}
        style={styles.typeIcon}
        onPress={() => {
          if (type === 'food') {
            setType('restaurant');
          } else {
            setType('food');
          }
        }}
        colors={[colors.home1, colors.home2, colors.white]}
        type={Icons.FontAwesome5}
      />
      <View style={[GlobalStyle.TitleBoxHeader]}>
        <Text style={GlobalStyle.Title}>Blacklist</Text>
      </View>
      <SafeAreaView style={styles.favBox}>
        {type === 'food' ? (
          <FlatList
            data={blacklistFood}
            initialNumToRender={10}
            renderItem={item => {
              return (
                <BlacklistItem
                  data={item.item}
                  navigation={props.navigation}
                  type={'food'}
                />
              );
            }}
            keyExtractor={item => item.id}
          />
        ) : (
          <FlatList
            data={blacklistRestaurant}
            initialNumToRender={10}
            renderItem={item => {
              return (
                <BlacklistItem
                  data={item.item}
                  navigation={props.navigation}
                  type={'restaurant'}
                />
              );
            }}
            keyExtractor={item => item.id}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  favBox: {
    marginTop: '6%',
    marginBottom: '26%',
    width: '96%',
    flex: 1,
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    borderRadius: 10,
  },
  typeIcon: {
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 1,
    elevation: 10,
  },
});

const mapStateToProps = state => ({
  blacklist: state.blacklist,
  foods: state.foods,
  restaurants: state.restaurants,
});

export default connect(mapStateToProps, {})(Blacklist);
