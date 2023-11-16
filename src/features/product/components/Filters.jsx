import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Disclosure } from "@headlessui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProductsByFilterAsync } from "../productSlice";

export default function Filters({ filters }) {
  const [filterObj, setFilterObj] = useState({
    color: [],
    category: [],
    brand: [],
  });

  const dispatch = useDispatch();


  const handleFilter = (e, filterName, filterValue) => {
    setFilterObj((prevFilterObj) => {
      const updatedFilter = { ...prevFilterObj }

      if (e.target.checked) {
        // Add filterValue to the filterName's array
        updatedFilter[filterName] = [...updatedFilter[filterName], filterValue]
      } else {
        // Remove filterValue from the filterName's array
        updatedFilter[filterName] = updatedFilter[filterName].filter(
          (item) => item !== filterValue
        );
      }

      dispatch(fetchProductsByFilterAsync(updatedFilter))

      return updatedFilter;
    })
  }

  return (
    <>
      <form className="hidden lg:block">
        <h3 className="sr-only">Categories</h3>

        {filters.map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          onChange={(e) =>
                            handleFilter(e, section.id, e.target.value)
                          }
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </>
  );
}
