import { format } from "date-fns";
import { PageRouterQueryParams } from "../classModels/queryParams/PageRouterQueryParams";
import { convertTimestampToDate } from "../helper/timestampToDate";
import { convertChildArrayOfNumbersIntoUrlQuery } from "../helper";

//////////// Search Router //////////////

export const routerToHotelSearchPage = async (
  params: PageRouterQueryParams,
) => {
  if (params.push) {
    const query: { [key: string]: string | string[] } = {
      q: params.searchText,
      checkin: String(format(params.checkin, "dd-MM-yyyy")),
      checkout: String(format(params.checkout, "dd-MM-yyyy")),
      num_nights: String(params.num_nights),
      num_guests: String(params.num_guests),
      num_adults: String(params.num_adults),
      num_rooms: String(params.num_rooms),
      num_children: String(params.num_children),
      child_age: String(params.child_age),
    };

    // Add all child ages in the desired format
    query.child_age = params.child_age.map(
      (age: number, index: number) => `${index}_${age}`,
    );

    params.router.push({
      pathname: `hotels/search/results`,
      query,
    });
  } else {
    const query: { [key: string]: string | string[] } = {
      q: params.searchText,
      checkin: String(format(params.checkin, "dd-MM-yyyy")),
      checkout: String(format(params.checkout, "dd-MM-yyyy")),
      num_nights: String(params.num_nights),
      num_guests: String(params.num_guests),
      num_adults: String(params.num_adults),
      num_rooms: String(params.num_rooms),
      num_children: String(params.num_children),
      child_age: String(params.child_age),
    };

    // Add all child ages in the desired format
    query.child_age = params.child_age.map(
      (age: number, index: number) => `${index}_${age}`,
    );

    params.router.replace({
      pathname: `/search/results`,
      query,
    });
  }
};

export const routerToSearchPage = async (params: PageRouterQueryParams) => {
  if (params.push) {
    const query: { [key: string]: string | string[] } = {
      q: params.searchText,
      checkin: String(format(params.checkin, "dd-MM-yyyy")),
      checkout: String(format(params.checkout, "dd-MM-yyyy")),
      num_nights: String(params.num_nights),
      num_guests: String(params.num_guests),
      num_adults: String(params.num_adults),
      num_rooms: String(params.num_rooms),
      num_children: String(params.num_children),
      child_age: String(params.child_age),
    };

    // Add all child ages in the desired format
    query.child_age = params.child_age.map(
      (age: number, index: number) => `${index}_${age}`,
    );

    params.router.push({
      pathname: `/search/results`,
      query,
    });
  } else {
    const query: { [key: string]: string | string[] } = {
      q: params.searchText,
      checkin: String(format(params.checkin, "dd-MM-yyyy")),
      checkout: String(format(params.checkout, "dd-MM-yyyy")),
      num_nights: String(params.num_nights),
      num_guests: String(params.num_guests),
      num_adults: String(params.num_adults),
      num_rooms: String(params.num_rooms),
      num_children: String(params.num_children),
      child_age: String(params.child_age),
    };

    // Add all child ages in the desired format
    query.child_age = params.child_age.map(
      (age: number, index: number) => `${index}_${age}`,
    );

    params.router.replace({
      pathname: `/search/results`,
      query,
    });
  }
};

export const routerToPaymentPage = async (params: PageRouterQueryParams) => {
  if (params.push) {
    const query: { [key: string]: string | string[] } = {
      hName: params.hotelName,
      hId: params.hotelSlugName,
      checkin: String(format(params.checkin, "dd-MM-yyyy")),
      checkout: String(format(params.checkout, "dd-MM-yyyy")),
      num_nights: String(params.num_nights),
      num_guests: String(params.num_guests),
      num_adults: String(params.num_adults),
      num_rooms: String(params.num_rooms),
      num_children: String(params.num_children),
    };

    // Add all child ages in the desired format
    query.child_age = params.child_age.map(
      (age: number, index: number) => `${index}_${age}`,
    );

    params.router.push({
      pathname: `/payment`,
      query,
    });
  } else {
    const query: { [key: string]: string | string[] } = {
      hName: params.hotelName,
      hId: params.hotelSlugName,
      checkin: String(format(params.checkin, "dd-MM-yyyy")),
      checkout: String(format(params.checkout, "dd-MM-yyyy")),
      num_nights: String(params.num_nights),
      num_guests: String(params.num_guests),
      num_adults: String(params.num_adults),
      num_rooms: String(params.num_rooms),
      num_children: String(params.num_children),
      child_age: String(params.child_age),
    };

    // Add all child ages in the desired format
    query.child_age = params.child_age.map(
      (age: number, index: number) => `${index}_${age}`,
    );

    params.router.replace({
      pathname: `/payment/`,
      query,
    });
  }
};

export const routerToHotelBookingPage = async (
  params: PageRouterQueryParams,
) => {
  // get the desired formatted child ages string with key and value
  // ex [2, 4] => child_age=0_2&child_age=1_4
  const childAgeQuery = convertChildArrayOfNumbersIntoUrlQuery(params.child_age);

  if (!params.isWebpage) {
    if (params.new_tab) {
      window.open(
        `/hotels/${params.hotelSlugName}/booking?checkin=${convertTimestampToDate(params.checkin.toISOString())}&checkout=${convertTimestampToDate(params.checkout.toISOString())}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&${childAgeQuery}`,
        "_blank",
      );
    } else if (params.push) {
      const query: { [key: string]: string | string[] } = {
        checkin: convertTimestampToDate(params.checkin.toISOString()),
        checkout: convertTimestampToDate(params.checkout.toISOString()),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        num_children: String(params.num_children),
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.push({
        pathname: `/hotels/${params.hotelSlugName}/booking`,
        query,
      });
    } else {
      const query: { [key: string]: string | string[] } = {
        checkin: convertTimestampToDate(params.checkin.toISOString()),
        checkout: convertTimestampToDate(params.checkout.toISOString()),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        num_children: String(params.num_children),
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.replace({
        pathname: `/hotels/${params.hotelSlugName}/booking`,
        query,
      });
    }
  } else {
    if (params.new_tab) {
      window.open(
        `/hotels/${params.hotelSlugName}/booking?checkin=${convertTimestampToDate(params.checkin.toISOString())}&checkout=${convertTimestampToDate(params.checkout.toISOString())}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&${childAgeQuery}`,
        "_blank",
      );
    } else if (params.push) {
      const query: { [key: string]: string | string[] } = {
        checkin: convertTimestampToDate(params.checkin.toISOString()),
        checkout: convertTimestampToDate(params.checkout.toISOString()),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        webpage: "true",
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.push({
        pathname: `/hotels/${params.hotelSlugName}/booking`,
        query,
      });
    } else {
      const query: { [key: string]: string | string[] } = {
        checkin: convertTimestampToDate(params.checkin.toISOString()),
        checkout: convertTimestampToDate(params.checkout.toISOString()),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        webpage: "true",
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.replace({
        pathname: `/hotels/${params.hotelSlugName}/booking`,
        query,
      });
    }
  }
};

//////////// Hotel Page Routers //////////

export const routerToHotelDetailPage = async (
  params: PageRouterQueryParams,
) => {
  // get the desired formatted child ages string with key and value
  // ex [2, 4] => child_age=0_2&child_age=1_4
  const childAgeQuery = convertChildArrayOfNumbersIntoUrlQuery(params.child_age);

  if (!params.isWebpage) {
    if (params.new_tab) {
      window.open(
        `/hotels/${params.hotelSlugName}?checkin=${String(format(params.checkin, "dd-MM-yyyy"))}&checkout=${String(format(params.checkout, "dd-MM-yyyy"))}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&${childAgeQuery}`,
        "_blank",
      );
    } else if (params.push) {
      const query: { [key: string]: string | string[] } = {
        checkin: String(format(params.checkin, "dd-MM-yyyy")),
        checkout: String(format(params.checkout, "dd-MM-yyyy")),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        num_children: String(params.num_children),
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.push({
        pathname: `/hotels/${params.hotelSlugName}/`,
        query,
      });
    } else {
      const query: { [key: string]: string | string[] } = {
        checkin: String(format(params.checkin, "dd-MM-yyyy")),
        checkout: String(format(params.checkout, "dd-MM-yyyy")),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        num_children: String(params.num_children),
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.replace({
        pathname: `/hotels/${params.hotelSlugName}/`,
        query,
      });
    }
  } else {
    if (params.new_tab) {
      window.open(
        `/hotels/${params.hotelSlugName}?checkin=${String(format(params.checkin, "dd-MM-yyyy"))}&checkout=${String(format(params.checkout, "dd-MM-yyyy"))}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&${childAgeQuery}`,
        "_blank",
      );
    } else if (params.push) {
      const query: { [key: string]: string | string[] } = {
        checkin: String(format(params.checkin, "dd-MM-yyyy")),
        checkout: String(format(params.checkout, "dd-MM-yyyy")),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        num_children: String(params.num_children),
        webpage: "true",
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.push({
        pathname: `/hotels/${params.hotelSlugName}/`,
        query,
      });
    } else {
      const query: { [key: string]: string | string[] } = {
        checkin: String(format(params.checkin, "dd-MM-yyyy")),
        checkout: String(format(params.checkout, "dd-MM-yyyy")),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        num_children: String(params.num_children),
        webpage: "true",
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.replace({
        pathname: `/hotels/${params.hotelSlugName}/`,
        query,
      });
    }
  }
};

export const routerToHotelCityPageWindowObj = async (
  citySlug: string,
  RegionSlug: string,
  params: PageRouterQueryParams,
) => {
  // get the desired formatted child ages string with key and value
  // ex [2, 4] => child_age=0_2&child_age=1_4
  const childAgeQuery = convertChildArrayOfNumbersIntoUrlQuery(params.child_age);

  const url = `/${citySlug}/${RegionSlug}?checkin=${String(format(params.checkin, "dd-MM-yyyy"))}&checkout=${String(format(params.checkout, "dd-MM-yyyy"))}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&hotelSlugFromSearch=${params.hotelSlugFromSearch}&${childAgeQuery}`;
  window.location.href = url;
};

export const routerToCityCountryPage = async (
  citySlug: string,
  hotelSlug: string,
  RegionSlug: string,
  countryCode: string,
  params: PageRouterQueryParams,
) => {
  // get the desired formatted child ages string with key and value
  // ex [2, 4] => child_age=0_2&child_age=1_4
  const childAgeQuery = convertChildArrayOfNumbersIntoUrlQuery(params.child_age);

  if (hotelSlug) {
    const url = `/hotels/${hotelSlug}`;
    window.location.href = url;
    return;
  }

  const url = `/city/${countryCode}/${citySlug}/${RegionSlug}?checkin=${String(format(params.checkin, "dd-MM-yyyy"))}&checkout=${String(format(params.checkout, "dd-MM-yyyy"))}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&hotel_slug=${hotelSlug}&${childAgeQuery}`;
  window.location.href = url;
};

export const routerToAllRoomsPage = async (params: PageRouterQueryParams) => {
  // get the desired formatted child ages string with key and value
  // ex [2, 4] => child_age=0_2&child_age=1_4
  const childAgeQuery = convertChildArrayOfNumbersIntoUrlQuery(params.child_age);

  if (!params.isWebpage) {
    if (params.new_tab) {
      window.open(
        `/hotels/${params.hotelSlugName}/rooms?checkin=${String(format(params.checkin, "dd-MM-yyyy"))}&checkout=${String(format(params.checkout, "dd-MM-yyyy"))}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&${childAgeQuery}`,
        "_blank",
      );
    } else if (params.push) {
      const query: { [key: string]: string | string[] } = {
        checkin: String(format(params.checkin, "dd-MM-yyyy")),
        checkout: String(format(params.checkout, "dd-MM-yyyy")),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        num_children: String(params.num_children),
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.push({
        pathname: `/hotels/${params.hotelSlugName}/rooms`,
        query,
      });
    } else {
      const query: { [key: string]: string | string[] } = {
        checkin: String(format(params.checkin, "dd-MM-yyyy")),
        checkout: String(format(params.checkout, "dd-MM-yyyy")),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        num_children: String(params.num_children),
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.replace({
        pathname: `/hotels/${params.hotelSlugName}/rooms`,
        query,
      });
    }
  } else {
    if (params.new_tab) {
      window.open(
        `/hotels/${params.hotelSlugName}/rooms?checkin=${String(format(params.checkin, "dd-MM-yyyy"))}&checkout=${String(format(params.checkout, "dd-MM-yyyy"))}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&${childAgeQuery}&webpage=true`,
        "_blank",
      );
    } else if (params.push) {
      const query: { [key: string]: string | string[] } = {
        checkin: String(format(params.checkin, "dd-MM-yyyy")),
        checkout: String(format(params.checkout, "dd-MM-yyyy")),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        num_children: String(params.num_children),
        webpage: "true",
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.push({
        pathname: `/hotels/${params.hotelSlugName}/rooms`,
        query,
      });
    } else {
      const query: { [key: string]: string | string[] } = {
        checkin: String(format(params.checkin, "dd-MM-yyyy")),
        checkout: String(format(params.checkout, "dd-MM-yyyy")),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        num_children: String(params.num_children),
        webpage: "true",
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.replace({
        pathname: `/hotels/${params.hotelSlugName}/rooms`,
        query,
      });
    }
  }
};

export const routerToRoomDetailPage = async (params: PageRouterQueryParams) => {
  // get the desired formatted child ages string with key and value
  // ex [2, 4] => child_age=0_2&child_age=1_4
  const childAgeQuery = convertChildArrayOfNumbersIntoUrlQuery(params.child_age);

  if (!params.isWebpage) {
    if (params.push) {
      const query: { [key: string]: string | string[] } = {
        checkin: String(format(params.checkin, "dd-MM-yyyy")),
        checkout: String(format(params.checkout, "dd-MM-yyyy")),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        num_children: String(params.num_children),
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.push({
        pathname: `/hotels/${params.hotelSlugName}/rooms/${params.roomId}`,
        query,
      });
    } else if (params.new_tab) {
      window.open(
        `/hotels/${params.hotelSlugName}/rooms/${params.roomId}?checkin=${String(format(params.checkin, "dd-MM-yyyy"))}&checkout=${String(format(params.checkout, "dd-MM-yyyy"))}&num_nights=${String(params.num_nights)}&num_guests=${String(params.num_guests)}&num_adults=${String(params.num_adults)}&num_rooms=${String(params.num_rooms)}&num_children=${String(params.num_children)}&${childAgeQuery}`,
        "_blank",
      );
    } else {
      const query: { [key: string]: string | string[] } = {
        checkin: String(format(params.checkin, "dd-MM-yyyy")),
        checkout: String(format(params.checkout, "dd-MM-yyyy")),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        num_children: String(params.num_children),
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.replace({
        pathname: `/hotels/${params.hotelSlugName}/rooms/${params.roomId}`,
        query,
      });
    }
  } else {
    if (params.push) {
      const query: { [key: string]: string | string[] } = {
        checkin: String(format(params.checkin, "dd-MM-yyyy")),
        checkout: String(format(params.checkout, "dd-MM-yyyy")),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        num_children: String(params.num_children),
        webpage: "true",
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.push({
        pathname: `/hotels/${params.hotelSlugName}/rooms/${params.roomId}`,
        query,
      });
    } else {
      const query: { [key: string]: string | string[] } = {
        checkin: String(format(params.checkin, "dd-MM-yyyy")),
        checkout: String(format(params.checkout, "dd-MM-yyyy")),
        num_nights: String(params.num_nights),
        num_guests: String(params.num_guests),
        num_adults: String(params.num_adults),
        num_rooms: String(params.num_rooms),
        num_children: String(params.num_children),
        webpage: "true",
      };

      // Add all child ages in the desired format
      query.child_age = params.child_age.map(
        (age: number, index: number) => `${index}_${age}`,
      );

      params.router.replace({
        pathname: `/hotels/${params.hotelSlugName}/rooms/${params.roomId}`,
        query,
      });
    }
  }
};

///////////// City/Region Page Router //////////////

export const routerToHotelCityPage = async (
  citySlug: string,
  RegionSlug: string,
  params: PageRouterQueryParams,
) => {
  const query: { [key: string]: string | string[] } = {
    checkin: String(format(params.checkin, "dd-MM-yyyy")),
    checkout: String(format(params.checkout, "dd-MM-yyyy")),
    num_nights: String(params.num_nights),
    num_guests: String(params.num_guests),
    num_adults: String(params.num_adults),
    num_rooms: String(params.num_rooms),
    num_children: String(params.num_children),
    hotelSlugFromSearch: String(params.hotelSlugFromSearch),
  };

  // Add all child ages in the desired format
  query.child_age = params.child_age.map(
    (age: number, index: number) => `${index}_${age}`,
  );

  params.router.push({
    pathname: `/${citySlug}/${RegionSlug}`,
    query,
  });
};
