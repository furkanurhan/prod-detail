import Api from '@/store/api';

const state = {
  product_detail: null,
  status: false,
  selectableAttributes: [],
  selectableVariants: [],
  selectedAttributes: { Renk: null, Beden: null },
  quantity: 0,
};

function checkIsDisable(value, name) {
  return !state.selectableVariants.some((variant) => variant.attributes.some((attribute) => attribute.value === value && attribute.name === name));
}

function checkIsActive(name, value) {
  return state.selectedAttributes[name] === value;
}

function getSelectableAttribute() {
  if (state.product_detail
    && state.product_detail.selectableAttributes
    && state.product_detail.selectableAttributes.length > 0) {
    return state.product_detail.selectableAttributes.map((attribute) => ({ name: attribute.name, values: attribute.values.map((value) => ({ name: value, isDisable: attribute.name === 'Renk' ? false : checkIsDisable(value, attribute.name), isActive: checkIsActive(attribute.name, value) })) }));
  }
  return [];
}

function getSelectableVariants() {
  return state.product_detail.productVariants.filter((variant) => variant.attributes.some((attribute) => attribute.name === 'Renk' && (attribute.value === state.selectedAttributes.Renk || !state.selectedAttributes.Renk)));
}

const getters = {
  title(state) {
    return state.product_detail ? state.product_detail.productTitle : '';
  },
  baremList(state) {
    return state.product_detail ? state.product_detail.baremList : [];
  },
  minPrice(state) {
    if (state.product_detail
      && state.product_detail.baremList
      && state.product_detail.baremList.length > 0) {
      return state.product_detail.baremList.reduce((prev, curr) => (prev.price < curr.price ? prev : curr)).price;
    }
    return null;
  },
  maxPrice(state) {
    if (state.product_detail
      && state.product_detail.baremList
      && state.product_detail.baremList.length > 0) {
      return state.product_detail.baremList.reduce((prev, curr) => (prev.price > curr.price ? prev : curr)).price;
    }
    return null;
  },
  minQuantity(state) {
    if (state.product_detail
      && state.product_detail.baremList
      && state.product_detail.baremList.length > 0) {
      return state.product_detail.baremList.reduce((prev, curr) => (prev.minimumQuantity < curr.minimumQuantity ? prev : curr)).minimumQuantity;
    }
    return null;
  },
  totalPrice(state) {
    if (state.product_detail
      && state.product_detail.baremList
      && state.product_detail.baremList.length > 0) {
      const selectedBarem = state.product_detail.baremList.find((barem) => barem.minimumQuantity <= state.quantity && barem.maximumQuantity >= state.quantity);
      return (selectedBarem && selectedBarem.price) ? (selectedBarem.price * state.quantity).toFixed(2) : 0;
    }
    return null;
  },
  selectedVariants(state) {
    if (state.product_detail
      && state.product_detail.productVariants
      && state.product_detail.productVariants.length > 0) {
      return state.product_detail.productVariants.filter((variant) => variant.attributes.some((attribute) => (!state.selectedAttributes.Renk && !state.selectedAttributes.Beden)
            || (state.selectedAttributes.Renk && attribute.name === 'Renk' && state.selectedAttributes.Renk === attribute.value)
            || (!state.selectedAttributes.Renk))
            && variant.attributes.some((attribute) => (!state.selectedAttributes.Renk && !state.selectedAttributes.Beden)
            || (state.selectedAttributes.Beden && attribute.name === 'Beden' && state.selectedAttributes.Beden === attribute.value)
            || (!state.selectedAttributes.Beden)));
    }
    return [];
  },
  imageList(state, getters) {
    const listGroup = getters.selectedVariants.length > 0 ? getters.selectedVariants.map((variant) => variant.images) : [];
    const list = [];
    listGroup.forEach((elGroup) => elGroup.forEach((el) => list.push(el)));
    return list;
  },
};

const mutations = {
  SET_PRODUCT_DETAIL(state, data) {
    state.product_detail = data;
    state.quantity = state.product_detail.baremList.reduce((prev, curr) => (prev.minimumQuantity < curr.minimumQuantity ? prev : curr)).minimumQuantity;
    state.selectableVariants = getSelectableVariants();
    state.selectableAttributes = getSelectableAttribute();
  },
  SET_STATUS(state, status) {
    state.status = status;
  },
  CHANGE_SELECTABLE_VARIANTS() {
    state.selectableVariants = getSelectableVariants();
  },
  CHANGE_SELECTABLE_ATTRIBUTE() {
    state.selectableAttributes = getSelectableAttribute();
  },
  CHANGE_BAREM_QUANTITY(state, data) {
    state.quantity = data;
  },
};

const actions = {
  getProductDetail({ commit }) {
    return new Promise((resolve, reject) => {
      Api().get('/productDetail').then((response) => {
        const { data } = response.data;
        if (data) {
          commit('SET_PRODUCT_DETAIL', data);
          commit('SET_STATUS', true);
        } else {
          commit('SET_STATUS', false);
        }
        resolve(data);
      }).catch((error) => {
        commit('SET_STATUS', false);
        reject(error);
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
